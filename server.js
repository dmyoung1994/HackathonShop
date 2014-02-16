'use strict';

var express         = require('express'),
	Response		= require('./response.js'),
	Test			= require('./test.js'),
	Datahandler		= require('./datahandler.js');


var app = express();
GLOBAL.EMAIL_BODY = null;
//ignore static file requests
app.use('/static',express.static(__dirname+'/static'));
app.use('/favicon.ico',express.static(__dirname+'/favicon.ico'));

app.use(express.bodyParser());

//!!!!!!!!!!!!!SET WEB SERVER LISTENER!!!!!!!!!!!!!!!!!!!
app.use(function(req, res){//, next){
	console.log('%s %s', req.method, req.url);
	var response = new Response(res),
		action = req.url.match(/\/([a-z]+)/)[1],
		handle = null,
		keywords = null,
		longt = null,
		lat = null;
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
		longt = req.url.match(/long=([^&\/]+)/)[1];
		lat = req.url.match(/lat=([^&\/]+)/)[1];
		handle.getProducts(lat,longt,response);
		console.log('keywords');
		break;
	case 'remove':
		keywords = req.url.match(/key=([^&\/]+)/)[1];
		keywords = keywords.split(',');
		handle = new Datahandler();
		handle.removeKeys(keywords);
		console.log('remove');
		res.send(204 );
		break;
	case 'add':
		keywords = req.url.match(/key=([^&\/]+)/)[1];
		keywords = keywords.split(',');
		handle = new Datahandler();
		handle.addKeys(keywords);
		console.log('add');
		res.send(204 );
		break;
	case 'like':
		handle = new Datahandler();
		handle.doLike(req.body.object);
		console.log('like');
		res.send(204 );
		break;
	case 'dislike':
		handle = new Datahandler();
		handle.doDislike(req.body.object);
		console.log('dislike');
		res.send(204 );
		break;
	case 'fav':
		handle = new Datahandler();
		response.sendFavs(handle.getFavs());
		console.log('fav');
		break;
	case 'change':
		handle = new Datahandler();
		longt = req.url.match(/long=([^&\/]+)/)[1];
		lat = req.url.match(/lat=([^&\/]+)/)[1];
		handle.changeLocation(lat,longt,response);
		console.log('change');
		//res.send(204 );
		break;
	case 'test':
		new Test(res);
		console.log('test');
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
