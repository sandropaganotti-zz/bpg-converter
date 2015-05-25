/* global Blob */
var Converter = function(decoder, encoder){
    this.decoder = new decoder();
    this.encoder = new encoder();
};

Converter.prototype.convert = function(srcBlob){
    this.decoder.decode(srcBlob);
    var out = this.encoder.encode(this.decoder.imageData.data, this.decoder.width, this.decoder.height);
    return new Blob([out], {type : this.encoder.mime});    
};