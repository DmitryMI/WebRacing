'use strict';
var node_static = require('node-static');
var http = require('http');

let static_path = "./static/"

var file = new (node_static.Server)(static_path);

http.createServer(function (req, res) {
    file.serve(req, res);
}).listen(1337);