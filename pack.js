var DEBUG = true;

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookie = require('cookie-parser');
var favicon = require('serve-favicon');

// Serve a download folder
function downloads(folder) {
	return express().use(express.static(folder, {
		'index': false,
		'setHeaders': setHeaders
	}));
}

// Set header to force download
function setHeaders(res, path) {
  res.setHeader('Content-Disposition', contentDisposition(path))
}


function read(file) {
	return fs.readFileSync(file, { encoding: 'utf8' });
}

function app() {
	var a = express();
	var fv = 'favicon.ico';
	try {
		read(fv);
		a.use(favicon(fv));
	} catch(e) {};
	a.use(cookie());
	a.use(bodyParser.json()); // for parsing application/json
	a.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	a.use(multer()); // for parsing multipart/form-data
	return a;
}

var ug = require('uglify-js');
var fs = require('fs');
var async = require('async');

function no(arg) {
	return typeof arg === 'undefined';
}

function yes(arg, init) {
	return (no(arg))?init:arg;
}

function minify(arg) {
	return ug.minify(arg, {
		fromString: true,
		mangle: true,
		compress: {
			sequences: true,
			dead_code: true,
			conditionals: true,
			booleans: true,
			unused: true,
			if_return: true,
			join_vars: true,
			drop_console: true
		}
	}).code;
}

var blank = function() { return ""; };//do nothing;

//supply file names and functions for generating string with one object argument
//A really ANNOYING way of Thread.yield(); --> Origination of Callback Hell
//Along with no pointers!!!
function cache(file, args, callback2) { 
	if(no(callback2)) {
		callback2 = args;
		args = null;
	}
	var fn = blank;
	if(no(callback2)) callback2 = blank;
	if(!(file instanceof Array)) file = [file];//each file
	async.reduce(file, "",
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
			if(err) console.log(err);
			callback2(result);
		}
	);
}

function flush(file) {
	try {
		fs.unlinkSync(file);
	} catch(e) {};
}

function compress(uncompressed, splice) {
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

	uncompressed = morph(unescape(encodeURIComponent(uncompressed)));//utf8
 
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
	function no(arg) {
		return typeof arg === 'undefined';
	}
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
	return decodeURIComponent(escape(merge(result)));
}

if(DEBUG) flush(".decomp.js");

cache([	function() {
		//in main node directory
		return minify(decompress.toString());
	},
	".decomp.js"]);

function pack(input, args) {
	var decomp = "";
	var html = true;
	var head = true;
	if(yes(args, false)) {
		html = yes(args.html, html);
		head = yes(args.head, head);
	}
	if(head) decomp = read(".decomp.js");
	return (html)?('<script>'+ decomp +'var J=\''+compress(input.toString())+'\';document.write(decompress(J));</script>'):
		(decomp +'var J=\''+compress(input.toString())+'\';eval(decompress(J));');
}

//This function packs down editable scripts in the "editable" directory to compressed
//files in the server root. The "editable" directory is in the server root.
//Quite likely a less compiler option soon.
function packCache(files, args, callback) {
	var decomp;
	if(no(callback)) {
		callback = args;
		args = null;
	}
	var html = true;
	var head = true;
	var prefix = "editable/";
	if(yes(args, false)) {
		html = yes(args.html, html);
		head = yes(args.head, head);
		prefix = yes(args.prefix, prefix);
	}
	if(head) decomp = read(".decomp.js");
	files.unshift(function(item, args) {
		return pack(read(prefix + item), { html: html, head: false});	
	});
	cache(files, args, function(res) {
		callback(((html)?'<script>':'') + decomp + ';' + ((html)?'</script>':'') + res);
	}); 
}

function cachePage(fileTot, files, args, callback) {
	if(no(callback)) {
		callback = args;
		args = null;
	}
	cache([	function() {
				packCache(files, args, blank);
			},
			fileTot],
			callback);
}

module.exports = {
	downloads: downloads,
	app: app,
	pack: pack,
	minify: minify,
	no: no,
	yes: yes,
	blank: blank,
	read: read,
	cache: cache,
	packCache: packCache,
	cachePage: cachePage,
	flush: flush,
	//also sets template element names to find <name>...</name> with JSON nesting
	generate: null,//a combination of file cache pack and setting source
	live: null//a utility auto update JS+JSON maker, makes some innerHTML in server push ajax with single client eval
}
