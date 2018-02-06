 var express = require("express");
 var app = express();

 /* serves main page */
 app.use(express.static(__dirname + '/dist'));
 app.listen(process.env.port||8080);