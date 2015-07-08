function compress(uncompressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = {},
            c,
            wc,
            w = "",
            result = "",
            dictSize = 256;
        for (i = 0; i < 256; i += 1) {
            dictionary[String.fromCharCode(i)] = i;
        }
 
        for (i = 0; i < uncompressed.length; i += 1) {
            c = uncompressed.charAt(i);
            wc = w + c;
            //Do not use dictionary[wc] because javascript arrays 
            //will return values for array['pop'], array['push'] etc
           // if (dictionary[wc]) {
            if (dictionary.hasOwnProperty(wc)) {
                w = wc;
            } else {
                result += String.fromCharCode(dictionary[w]);
                // Add wc to the dictionary.
                dictionary[wc] = dictSize++;
                w = String(c);
            }
        }
 
        // Output the code for w.
        if (w !== "") {
            result += String.fromCharCode(dictionary[w]);
        }
        return result;
};

decomp = 'var W,H,A,K=\'function decompress() {\n "use strict";\n // Build the .\n var i,\n  = [],\n w,\n ,\n k,\n  = "",\n  = 256;\n for (i = 0; i < 256; i += 1) {\n [i] = String.fromCharCode(i);\n }\n \n w = .(0);\n  = w;\n for (i = 1; i < .length; i += 1) {\n k = .(i);\n if ([k]) {\n  = [k];\n }  {\n if (k === ) {\n  = w + w.(0);\n }  {\n  null;\n }\n }\n \n  += ;\n \n // Add w+[0] to the .\n [++] = w + .(0);\n \n w = ;\n }\n  ;\n };\',W=\'\'.split(\'\'),H=\'dictionary|compressed|entry|result|charAt|dictSize|return|else\'.split(\'|\');for(A in H)K=K.split(W[A]).join(H[A]);eval(K);'

module.exports = {
	pack: function(input) {
		return decomp+'var J=\''+compress(input.toString())+'\';eval(decompress(J));';
	}
};
