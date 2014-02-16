'use strict';

var http = require('http');
var URL = require('url');

function Response(res){
	this.res = res;
	this.ajax = function(url){
		var myRes = this.res;
		var address = URL.parse(url);
		var options = {
		  host: address.hostname,
		  path: address.path
		};
		console.log('host:'+options.host);
		console.log('path:'+options.path);

		var req = http.get(options, function(res) {
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));

			// Buffer the body entirely for processing as a whole.
			var bodyChunks = [];
			res.on('data', function(chunk) {
				// You can process streamed parts here...
				bodyChunks.push(chunk);
			}).on('end', function() {
				var body = Buffer.concat(bodyChunks);
				myRes.send(body);
				console.log('BODY: ' + body);
				// ...and/or process the entire body here.
			});
		});

		req.on('error', function(e) {
			console.log('ERROR: ' + e.message);
		});
	};
}

module.exports      = Response;