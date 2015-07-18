var DEBUG = false;

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookie = require('cookie-parser');
var favicon = require('serve-favicon');
var statServ = require('serve-static');
var logs = require('morgan');
var less = require('less-middleware');
var htmlMinLoad = require('html-minifier').minify;

function htmlMin(arg) {
	htmlMinLoad(arg, {
		removeComments: true,
		removeCommentsFromCDATA: true,
		collapseWhitespace: true,
		collapseBooleanAttributes: true,
		removeRedundantAttributes: true,
		useShortDoctype: true,
		removeEmptyAttributes: true,
		removeOptionalTags: true,
		minifyJS: true,
		minifyCSS: true
	});
}

// Serve a download folder
function downloads(folder) {
	return express().use(statServ(folder, {
		'index': false,
		'setHeaders': setHeaders
	}));
}

//serve say an image folder
function serve(folder) {
	return express().use(statServ(folder, {
		'index': false
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
	var accessLogStream = fs.createWriteStream('access.log', {flags: 'a'});
	a.use(logs('combined', {stream: accessLogStream}));
	a.use(cookie());
	a.use('/css', less('css', { force: DEBUG }));
	a.use('/css', statServ('css'));
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

function minify(arg) {
	return ug.minify(arg.toString(), {
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
		args = defaults();
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
			if(DEBUG || args.debug) flush(item);
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
							callback(null, memo + result);
	    					}
					);
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

function compress(uncompressed) {
        // Build the dictionary.
        var i,
            dictionary = {},
            c,
            wc,
            w = "",
            result = "",
	    k,
	    last = 0,
            dictSize = 0xF0 - 64;
        for (i = 0; i < dictSize; i += 1) {
            dictionary[String.fromCharCode(i)] = i;
        }

	uncompressed = unescape(encodeURIComponent(uncompressed));//utf8
 
        for (i = 0; i < uncompressed.length; i++) {
            c = uncompressed.charAt(i);
	    k = c.charCodeAt(0);
	    if(k >= 0x80) {
		if(k < 0xC0) {
			k -= 96;
		} else {
			if(k == last) {
				continue;
			}
			last = k;
			k -= 64;
		}
	    } else {
		if(last != 0) {
			last = 0;
			--i;
			k = 0xC0 - 64;
		}
	    }
	    c = String.fromCharCode(k);
            wc = w + c;
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
        return escape(result);
};

function decompress(compressed) {
        // Build the dictionary.
        var i,
            dictionary = [],
            w,
            result,
            k,
            entry = "",
	    last = 0,
	    lmany = 0,
            dictSize = 0xF0 - 64;
        for (i = 0; i < dictSize; i += 1) {
            dictionary[i] = String.fromCharCode(i);
        }

	compressed = unescape(compressed);
 
        w = String.fromCharCode(compressed.charAt(0));
        result = w;
	many = 0;
        for (i = 1; i < compressed.length; i++) {
            k = compressed.charAt(i);
            if (dictionary[k]) {
                entry = dictionary[k];
            } else {
                if (k === dictSize) {
                    entry = w + w.charAt(0);
                } return "";
            }
 
            result += entry;
 
            // Add w+entry[0] to the dictionary.
            if(dictSize < 65536) dictionary[dictSize++] = w + entry.charAt(0);
 
            w = entry;
        }
	w = "";
	for(i = 0; i < result.length; i++) {
	    k = result.charCodeAt(i);
	    if(k == 0xC0 - 64) {
		last = 0;
		many = 0;
		continue;
	    }
	    if(k >= 0x80) {
		k += 64;
		++many;
		last = k;
		if(k >= 0xE0) ++many;
		lmany = many;
	    } else {
		if(many-- > 0) {
			k += 96;
		} else {
			many = lmany;
			--i;
			k = last;
		}
	    }
	    w += String.fromCharCode(k);
	}
	return decodeURIComponent(escape(w));
}

//adds a compressor
function ucompress(uncompressed) {
	uncompressed = compress.toString() + uncompressed;
	return compress(uncompressed);
}

//gets better compression
function pcompress(uncompressed, prefix) {
	var c = compress(prefix).length - 2;//perhaps last escaped entry differs
	var d = compress(prefix + uncompressed);
	return d.substring(c, d.length);//get the compressed
}

//gets decompression of better pcompress
//NB THIS FUNCTION USES A COMPRESSED PREFIX
function pdecompress(compressed, cprefix) {
	var z = decompress(compressed);
	if(z === "") {
		var d = cprefix.substring(0, c.length - 2) + compressed;
		return decompress(d);//redefines compress but what the hell
	} else return z;
}

var cfilename = ".comps.js";
var comps;

cache([	function() {
		//in main node directory
		return pack(minify(compress) + minify(ucompress) + minify(pcompress) + minify(pdecompress), { html: false });
	},
	cfilename], function() {
			comps = read(cfilename);
	});

var filename = ".decomp.js";
var decomp;

cache([	function() {
		//in main node directory
		return minify(decompress);
	},
	filename], function() {
			decomp = read(filename);
	});

function pack(input, args) {
	return (args.html)?('<script>document.write(decompress(\''+compress(htmlMin(input.toString()))+'\'));</script>'):
		('eval(decompress(\''+compress(minify(input))+'\'));');
}

//This function packs down editable scripts in the "editable" directory to compressed
//files in the server root. The "editable" directory is in the server root.
function packCache(files, args, callback) {
	var decomp;
	if(no(callback)) {
		callback = args;
		args = defaults();
	}
	var context = args.editable;
	files.unshift(function(item, args) {
		return pack(read(context + item), args);	
	});
	cache(files, args, function(res) {
		callback(res);
	}); 
}

function cachePage(fileTot, files, args, callback) {
	if(no(callback)) {
		callback = args;
		args = defaults();
	}
	var header = "";
	if(args.head) header += args.jsLoad;
	if(args.head && args.html) {
		header += "<script defer src='/"+filename+"'></script>";
		if(args.comp) header += "<script defer src='/"+cfilename+"'></script>";
	}
	if(args.head && !args.html) {
		header = decomp;
		if(args.comp) header += comps;//add in compressor options
	}
	packCache(files, args,
		function(res) {
			cache([
				function() {
					return header + res;
				},
				//NB. escape and splice
				fileTot], function(result) { callback(result) });
		}
	);		
}

function getExtension(filename) {
    return filename.split('.').pop();
}

var defaultArgs = {
	html: true,//draws html not js
	head: true,//puts a decompress head on and all the jsLoad file links
	prefix: "cache/",//prefix to final cache to
	editable: "editable/",//editable script location
	comp: true,//send compression header too for client compress
	jsLoad: "",//list of js files to include
	debug: false //set to debug a particular packServe
};

function defaults() {
	return defaultArgs;
}

function options(args) {
	if(no(args)) return defaults();
	var these = new defaultArgs;
	for(i in args) {
		these[i] = args[i];
	}
	return these;
}

function packServe(js, args) {
	if(no(args)) args = js;
	var jsLoad = "";
	if(!no(js)) for(i = 0; i < js.length; i++) {
		jsLoad += "<script defer src='/"+js[i]+"'></script>";
	}
	var use = new packServeLoad; 
	use.args = options(args);
	use.args.jsLoad += jsLoad;
	return use;
}

function packServeLoad(req, res, next) {
	var file = req.path;
	var path = "." + req.path;//protect
	var args = this.args;
	cachePage(this.args.prefix + path, [path], this.args, function (res) {
		if(!args.html) res.set('Content-Type', 'application/javascript');
		res.send(res);
	});
}

module.exports = {
	DEBUG: DEBUG,//true to clean cache
	compress: compress,
	decompress: decompress,
	ucompress: ucompress,
	pcompress: pcompress,
	pdecompress: pdecompress;
	serve: serve,
	downloads: downloads,
	app: app,
	pack: pack,
	minify: minify,
	no: no,
	getExtension: getExtension,
	blank: blank,
	read: read,
	cache: cache,
	packServe: packServe,
	flush: flush,
	options: options,
	defaults: defaults
}
