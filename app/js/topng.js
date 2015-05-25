var window = window || {};

Number.prototype.toUInt=function(){ return this<0?this+4294967296:this; };
Number.prototype.bytes32=function(){ return [(this>>>24)&0xff,(this>>>16)&0xff,(this>>>8)&0xff,this&0xff]; };
Number.prototype.bytes16sw=function(){ return [this&0xff,(this>>>8)&0xff]; };

Array.prototype.adler32=function(start,len){
        switch(arguments.length){ case 0:start=0; case 1:len=this.length-start; }
        var a=1,b=0;
        for(var i=0;i<len;i++){
                a = (a+this[start+i])%65521; b = (b+a)%65521;
        }
        return ((b << 16) | a).toUInt();
};
Uint8Array.prototype.adler32 = Array.prototype.adler32;

Array.prototype.crc32=function(start,len){
        switch(arguments.length){ case 0:start=0; case 1:len=this.length-start; }
        var table=arguments.callee.crctable;
        if(!table){
                table=[];
                var c;
                for (var n = 0; n < 256; n++) {
                        c = n;
                        for (var k = 0; k < 8; k++)
                                c = c & 1?0xedb88320 ^ (c >>> 1):c >>> 1;
                        table[n] = c.toUInt();
                }
                arguments.callee.crctable=table;
        }
        var c = 0xffffffff;
        for (var i = 0; i < len; i++)
                c = table[(c ^ this[start+i]) & 0xff] ^ (c>>>8);

        return (c^0xffffffff).toUInt();
};
Uint8Array.prototype.crc32 = Array.prototype.crc32; 

window.PNGencoder = function(){
    this.mime= 'image/png';
};

window.PNGencoder.prototype.encode = function(imageData, width, height){
    var w=width;
    var h=height;
    var len=h*(w*4+1);
    var blocks=Math.ceil(len/32768);    
    var stream=[
            0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,
            0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52
    ];
    Array.prototype.push.apply(stream, w.bytes32() );
    Array.prototype.push.apply(stream, h.bytes32() );
    stream.push(0x08,0x06,0x00,0x00,0x00);
    Array.prototype.push.apply(stream, stream.crc32(12,17).bytes32() );
    for(var y=0;y<h;y++)
            imageData.splice(y*(w*4+1),0,0);
    Array.prototype.push.apply(stream, (len+5*blocks+6).bytes32() );
    var crcStart=stream.length;
    var crcLen=(len+5*blocks+6+4);
    stream.push(0x49,0x44,0x41,0x54,0x78,0x01);

    var stream2 = new Uint8Array(43 + len + 20 + (5*blocks));
    stream2.set(stream, 0);
    var base = stream.length;

    for(var i=0;i<blocks;i++){
            var blockLen=Math.min(32768,len-(i*32768));
            var tmp = new Uint8Array(blockLen + 1 + 2 + 2);
            tmp.set([i==(blocks-1)?0x01:0x00], 0);
            tmp.set(blockLen.bytes16sw(), 1);
            tmp.set((~blockLen).bytes16sw(), 3);
            var id=imageData.slice(i*32768,i*32768+blockLen);
            tmp.set(id, 5);
            stream2.set(tmp, base);
            base = base + tmp.length;
    }

    stream2.set(imageData.adler32().bytes32(), base);
    base = base + 4;

    stream2.set(stream2.crc32(crcStart,crcLen).bytes32(), base);
    base = base + 4;

    stream2.set([0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44], base);
    base = base + 8;
    
    stream2.set(stream2.crc32(stream2.length-4, 4).bytes32(), base);
    base = base + 4;

    return stream2;
};