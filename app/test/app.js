/*globals describe it expect Converter beforeEach*/

describe('the converter', function() {
    it('exists', function(){
        expect(Converter).to.be.defined;
    });
    
    describe('its features', function(){
        var converter;
        
        beforeEach(function(){
            converter = new Converter(window.BPGDecoder, window.PNGencoder);
        });
        
        it('stores encoder and decoder', function(){
            expect(converter.encoder).to.be.deep.equal(new window.PNGencoder());
            expect(converter.decoder).to.be.deep.equal(new window.BPGDecoder());
        });
        
        it('coverts to PNG', function(done){
            var req = new XMLHttpRequest();
            req.open('get','2small.bpg');
            req.responseType="arraybuffer";
            req.onload = function(){
                var result = converter.convert(req.response);
                expect(result.type).to.be.equal("image/png");
                done();
            };
            req.send();            
        });
    });
});