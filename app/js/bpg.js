/* global l*/

window.BPGDecoder.prototype.decode = function(image){
    var c = this;
    var a = new Uint8Array(image),
        f, g, j, m, p, q, K, r, n, s, u, G, z, ua, W, Qa;
    f = c.H();
    console.log('preinit',f, a, a.length);
    if (0 > c.C(f, a, a.length)) console.log("could not decode image");
    else {
        j = c.r(20);
        c.F(f, j);
        n = l.HEAPU8;
        m = l.HEAPU16;
        s = l.HEAPU32;
        a = s[j >> 2];
        g = s[j + 4 >> 2];
        Qa = m[j + 16 >> 1];
        K = 4 * a;
        q = c.r(K);
        r = 0;
        for (W = []; !(0 > c.I(f, 1));) {
            c.D(f, j, j + 4);
            ua = 1E3 * s[j >> 2] / s[j + 4 >> 2];
            c.width = a;
            c.height = g;
            m = { data: new Array(a * g * 4) };
            u = m.data;
            for (z = p = 0; z < g; z++) {
                c.G(f,
                    q);
                for (G = 0; G < K; G = G + 1 | 0) u[p] = n[q + G | 0] | 0, p = p + 1 | 0;
            }
            W[r++] = {
                img: m,
                duration: ua
            };
        }
        c.o(q);
        c.o(j);
        c.B(f);
        c.loop_count = Qa;
        c.frames = W;
        c.imageData = W[0].img;
    }
};