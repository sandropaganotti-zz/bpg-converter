onfetch = function(evt){
    var url = evt.request.url;
    if(/\.bpg\.png$/.test(url)){
        evt.respondWith(
            fetch(url.substr(0,url.length - 4)).then(function(res){
                return res.arrayBuffer();  
            }).then(function(buffer) {
                var converter = new Converter(window.BPGDecoder, window.PNGencoder);
                var png = converter.convert(buffer);
                return new Response(png, { headers: {"Content-Type": "image/png"} });
            })
        );
    }
};
