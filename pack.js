function template(bin) {
	return bin;//later
};

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

	uncompressed = template(new Buffer(uncompressed));//utf8
 
        for (i = 0; i < uncompressed.length; i += 1) {
            c = uncompressed[i];
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

function merge(bin) {
	return bin;//later
};

function decompress(compressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = [],
            w,
            result,
            k,
            entry = "",
            dictSize = 256;
        for (i = 0; i < 256; i += 1) {
            dictionary[i] = String.fromCharCode(i);
        }
 
        w = String.fromCharCode(compressed[0]);
        result = w;
        for (i = 1; i < compressed.length; i += 1) {
            k = compressed[i];
            if (dictionary[k]) {
                entry = dictionary[k];
            } else {
                if (k === dictSize) {
                    entry = w + w.charAt(0);
                } else {
                    return null;
                }
            }
 
            result += entry;
 
            // Add w+entry[0] to the dictionary.
            dictionary[dictSize++] = w + entry.charAt(0);
 
            w = entry;
        }
	result = merge(new Buffer(result, 'binary')).toString('utf8');
        return result;
};

decomp = 'function decompress(a){"use strict";var b,d,e,f,c=[],g="",h=256;for(b=0;256>b;b+=1)c[b]=String.fromCharCode(b);for(d=String.fromCharCode(a[0]),e=d,b=1;b<a.length;b+=1){if(f=a[b],c[f])g=c[f];else{if(f!==h)return null;g=d+d.charAt(0)}e+=g,c[h++]=d+g.charAt(0),d=g}return e=merge(new Buffer(e,"binary")).toString("utf8")}';

module.exports = {
	pack: function(input, html = false) {
		if(html) return '<script>'+decomp+';var J=\''+compress(input.toString())+'\';document.write(decompress(J));</script>';
		return decomp+';var J=\''+compress(input.toString())+'\';eval(decompress(J));';
	}
};
