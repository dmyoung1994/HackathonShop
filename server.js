'use strict';

var express         = require('express'),
	events          = require('events'),
	Response		= require('./response.js'),
	Datahandler		= require('./datahandler.js');
//	server          = new events.EventEmitter();    //will be used in child modules

var app = express();
GLOBAL.EMAIL_BODY = null;
//ignore static file requests
app.use('/static',express.static(__dirname+'/static'));
app.use('/favicon.ico',express.static(__dirname+'/favicon.ico'));

app.use(express.bodyParser());

//!!!!!!!!!!!!!SET WEB SERVER LISTENER!!!!!!!!!!!!!!!!!!!
app.use(function(req, res){//, next){
	console.log('%s %s', req.method, req.url);
	var response = new Response(res);
	var action = req.url.match(/\/([a-z]+)/)[1];
	var handle = null;
	var keywords = null;
	var location = null;
	switch(action){
	case 'ajax':
		console.log('ajax');
		//test code
		//var ajax_url = 'http://apitest.retailigence.com/v2.1/products?&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_&requestorid=test&userlocation=94063&keywords=star+wars+lego';
		var ajax_url = req.body.url;
		response.ajax(ajax_url);
		break;
	case 'keywords':
		handle = new Datahandler();
		response.sendKeywods(handle.getKeywords());
		console.log('keywords');
		break;
	case 'products':
		handle = new Datahandler();
		location = req.url.match(/loc=([^&\/]+)/)[1];
		handle.getProducts(location,response);
		console.log('keywords');
		break;
	case 'remove':
		keywords = req.url.match(/key=([^&\/]+)/)[1];
		keywords = keywords.split(',');
		handle = new Datahandler();
		handle.removeKeys(keywords).then(function(){
			console.log('removing keys');
		});
		console.log('remove');
		break;
	case 'add':
		keywords = req.url.match(/key=([^&\/]+)/)[1];
		keywords = keywords.split(',');
		handle = new Datahandler();
		handle.addKeys(keywords);
		console.log('add');
		break;
	case 'fav':
		handle = new Datahandler();
		response.sendFavs(handle.getFavs());
		console.log('fav');
		break;
	case 'change':
		handle = new Datahandler();
		location = req.url.match(/loc=([^&\/]+)/)[1];
		handle.changeLocation(location,response);
		console.log('change');
		break;
	default:
		//send test output
		res.send('hello');
		break;
	}
});
var port = 8888;
if (typeof process.env.PORT !== 'undefined'){
	port = process.env.PORT;
}
app.listen(port);