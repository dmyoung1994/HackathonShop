'use strict';

var http = require('http');
var URL = require('url');
var jade = require('jade');
var API_USER = 'segah',
	API_KEY = 'Gy3NsCQYwD3QTP';
function Response(res){
	this.res = res;
	this.ajax = function(url){
		var myRes = this.res;
		var address = URL.parse(url);
		var options = {
		  host: address.hostname,
		  path: address.path
		};

		var req = http.get(options, function(res) {

			// Buffer the body entirely for processing as a whole.
			var bodyChunks = [];
			res.on('data', function(chunk) {
				// You can process streamed parts here...
				bodyChunks.push(chunk);
			}).on('end', function() {
				var body = Buffer.concat(bodyChunks);
				myRes.send(body);
				// ...and/or process the entire body here.
			});
		});

		req.on('error', function(e) {
			console.log('ERROR: ' + e.message);
		});
	};

	this.sendFavs = function(list){
		var obj = {favs: list};
		this.res.send(JSON.stringify(obj));
	};
	this.sendKeywods = function(list){
		var obj = {keywords: list};
		this.res.send(JSON.stringify(obj));
	};
	this.out = function(data){
		this.res.send(data);
	};
	this.sendEmail = function(data,most_popular_keyword){
		//var myRes = this.res;
		data = JSON.parse(data);
		GLOBAL.EMAIL_BODY = data;
		jade.renderFile('email.jade',
			{
				filename: '',
				debug: false,
				globals: ['GLOBAL.EMAIL_BODY']
			}, function (err, text) {
				if (err){
					throw err;
				}
				//myRes.send(text);
				
				var sendgrid  = require('sendgrid')(API_USER, API_KEY);
				var Email     = sendgrid.Email;
				var email     = new Email({
				  to:       'dmyoung1994@gmail.com',
				  from:     'segahm@gmail.com',
				  subject:  'Shop near me - '+most_popular_keyword,
				  html:     text
				});
				sendgrid.send(email, function(err, json) {
				  if (err) { return console.error(err); }
				  console.log(json);
				});
			}
		);
	};
}

module.exports      = Response;