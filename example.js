//===========================================================================
//NODE EXPRESS SERVER
//===========================================================================
var pack = require('selfexjs');
var app = pack.app();//an express app with some form data post handlers etc.
//var vhost = require('vhost');
pack.DEBUG = true;//turn on debug flushing

app.get('/', function(req, res){
  res.send('hello world');
});
app.get('/pack', function(req, res){
  //res.send(pack.pack(JSON.stringify(req.body, null, "\t"));
  res.send(pack.pack('<html><body>hello world!</body></html>', { html: false, head: true }));
});

pack.downloads('downloads').listen(3003);//static download serving from downloads directory

app.listen(3000);
