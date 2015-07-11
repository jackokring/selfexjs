var ug = require('uglify-js');
var fs = require('fs');
var async = require('async');

function no(arg) {
	return typeof arg === 'undefined';
}

//supply file names and functions for generating string with one object argument
//A really ANNOYING way of Thread.yield(); --> Origination of Callback Hell
function cache(file, args) { 
	if(no(args)) args = null;
	var fn = function() { return ""; };//do nothing
	if(!(file instanceof Array)) file = [file];//each file
	return async.reduce(file, "",
		function(memo, item, callback) {
			if(item instanceof Function) {
				fn = item;
				callback(null, memo);
				return;
			}
			fs.readFile(item, { encoding: 'utf8' },
				function(err, data) {
					if(!err) {
						callback(null, memo + data);
						return;
					}
					var result = fn(item, args);
					fs.writeFile(item, result, { encoding: 'utf8' },
						function(err) {
							if(err) console.log(err);
	    					}
					);
					callback(null, memo + result);
				}
			);
		},
		function(err, result){
			if(err) console.log(err + " <" + result + ">");//unlikely
		}
	);
}

function flush(file) {
	try {
		fs.unlinkSync(file);
	} catch(e) {};
}

function compress(uncompressed, splice) {
	function no(arg) {
		return typeof arg === 'undefined';
	}
	if(no(splice)) splice = null;
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
	function morph(bin) {
		return bin;//later
		//the aim is to use bytes #C0 and #C1 to creative effect
		//along with sending higher than the unknown current symbol
		//for template insertion points. Client side template
		//loading with effective caching.

		//Also dictionary persistance for relative coding of JSON
		//data sourcing (maybe not worth the server side loading).
	}

	uncompressed = morph(new Buffer(uncompressed, 'utf8'));//utf8
 
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
                if(dictSize < 65536) dictionary[wc] = dictSize++;
                w = String(c);
            }
        }
 
        // Output the code for w.
        if (w !== "") {
            result += String.fromCharCode(dictionary[w]);
        }
        return result;
};

function decompress(compressed, json) {
	if(no(json)) json = null
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
        function merge(bin) {
		return bin;//later
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
            if(dictSize < 65536) dictionary[dictSize++] = w + entry.charAt(0);
 
            w = entry;
        }
	result = merge(new Buffer(result, 'binary')).toString('utf8');
        return result;
}

flush(".decomp.js");

var decomp = cache([	function() {
				//in main node directory
				return ug.minify(decompress.toString(), {fromString: true});
			},
			".decomp.js"]);

function pack(input, html, head) {
	if(no(html)) html = true;
	if(no(head)) head = true;
	if(html) return '<script>'+((head)?decomp:'')+';var J=\''+compress(input.toString())+'\';document.write(decompress(J));</script>';
	return ((head)?decomp:'')+';var J=\''+compress(input.toString())+'\';eval(decompress(J));';
}

//This function packs down editable scripts in the "editable" directory to compressed
//files in the server root. The "editable" directory is in the server root.
//Quite likely a less compiler option soon.
function packCache(files, html, args, prefix) {
	if(no(html)) html = true;
	if(no(args)) args = true;
	if(no(prefix)) prefix = "editable/";
	files.unshift(function(item, args) {
		return pack(fs.readFile(prefix + item, { encoding: utf8 }), html, false);	
	});
	return ((html)?'<script>':'') + decomp + ';' + ((html)?'</script>':'') + cache(files, args); 
}

function cachePage(fileTot, files, html, args, prefix) {
	if(no(html)) html = true;
	if(no(args)) args = true;
	if(no(prefix)) prefix = "editable/";
	return cache([	function() {
				return packCache(files, html, args, prefix);
			},
			fileTot]);
}

module.exports = {
	pack: pack,
	cache: cache,
	packCache: packCache,
	cachePage: cachePage,
	flush: flush,
	//also sets template element names to find <name>...</name> with JSON nesting
	generate: null,//a combination of file cache pack and setting source
	live: null//a utility auto update JS+JSON maker, makes some innerHTML in server push ajax with single client eval
}
