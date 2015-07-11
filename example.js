var express = require('express');
var app = express();
var pack = require('selfexjs');

/* var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
*/

app.get('/', function(req, res){
  res.send('hello world');
});
app.get('/pack', function(req, res){
  //res.send(pack.pack(JSON.stringify(req.body, null, "\t"));
  res.send(pack.pack('<html><body>hello world!</body></html>', { html: false, head: true }));
});

app.listen(3000,'127.0.0.1');
