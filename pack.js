var ug = require('uglify-js');

var json;

function setSource(j) {
	json = j;//later
};

function compress(uncompressed) {
        "use strict";
	var template = function(bin) {
		return bin;//later
		//the aim is to use bytes #C0 and #C1 to creative effect
		//along with sending higher than the unknown current symbol
		//for template insertion points. Client side template
		//loading with effective caching.

		//Also dictionary persistance for relative coding of JSON
		//data sourcing (maybe not worth the server side loading).
	};
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

function decompress(compressed) {
        var merge = function(bin) {
		return bin;//later
	};
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
};'

var decomp = ug.minify(decompress.toSting(), {fromString: true});

module.exports = {
	pack: function(input, html = false) {
		if(html) return '<script>'+decomp+';var J=\''+compress(input.toString())+'\';document.write(decompress(J));</script>';
		return decomp+';var J=\''+compress(input.toString())+'\';eval(decompress(J));';
	},
	setSource: setSource
};
