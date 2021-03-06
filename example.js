//===========================================================================
//NODE EXPRESS SERVER
//===========================================================================
var pack = require('selfexjs');
var app = pack.app();//an express app with some form data post handlers etc.
//var vhost = require('vhost');
pack.DEBUG = true;//turn on debug flushing


app.use('/downloads', pack.downloads('downloads'));//static download serving from downloads directory
app.use('/images', pack.serve('images'));
app.get('/pack', function(req, res){
  //res.send(pack.pack(JSON.stringify(req.body, null, "\t"));
  res.send(pack.pack('<html><body>hello world!</body></html>', { html: false }));
});
app.use('/', pack.packServe(/* javascript array, args */));

app.listen(3000);
