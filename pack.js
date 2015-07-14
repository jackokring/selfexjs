var DEBUG = false;

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookie = require('cookie-parser');
var favicon = require('serve-favicon');
var statServ = require('serve-static');
var logs = require('morgan');
var less = require('less-middleware');

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
		args = {};
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
			if(DEBUG) flush(item);
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
            dictSize = 0xD0;
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
            dictSize = 0xD0;
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
                }
            }
 
            result += entry
 
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

var filename = ".decomp.js";
var decomp;

cache([	function() {
		//in main node directory
		decomp = minify(decompress.toString()) + ";";
		return decomp;
	},
	filename]);

function pack(input, args) {
	var html = true;
	if(yes(args, false)) {
		html = yes(args.html, html);
	}
	return (html)?('<script>document.write(decompress(\''+compress(input.toString())+'\'));</script>'):
		('eval(decompress(\''+compress(minify(input.toString()))+'\'));');
}

//This function packs down editable scripts in the "editable" directory to compressed
//files in the server root. The "editable" directory is in the server root.
function packCache(files, args, callback) {
	var decomp;
	if(no(callback)) {
		callback = args;
		args = {};
	}
	files.unshift(function(item, args) {
		return pack(read("editable/" + item), args);	
	});
	cache(files, args, function(res) {
		callback(res);
	}); 
}

function cachePage(fileTot, files, args, callback) {
	if(no(callback)) {
		callback = args;
		args = {};
	}
	var header = "";
	var head = true;
	var html = true;
	if(yes(args, false)) {
		head = yes(args.head, true);
		html = yes(args.html, true);
	}
	if(head && html) header = "<script src='/"+filename+"'></script>";
	if(head && !html) header = decomp;
	packCache(files, args,
		function(res) {
			cache([
				function(file, arg) {
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

function packServe(req, res, next) {
	var file = req.path;
	var args = {};
	args.html = (getExtension(file) === "html")?true:false;
	args.header = args.html;
	var path = "." + req.path;
	cachePage("cache/" + path, [path], args, function (res) {
		res.send(res);
	});
}

module.exports = {
	DEBUG: DEBUG,//true to clean cache
	serve: serve,
	downloads: downloads,
	app: app,
	pack: pack,
	minify: minify,
	no: no,
	yes: yes,
	blank: blank,
	read: read,
	cache: cache,
	packServe: packServe,
	flush: flush
}
