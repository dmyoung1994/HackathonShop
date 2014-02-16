'use strict';

var express         = require('express'),
	Response		= require('./response.js'),
	Knex 			= require('knex'),
	Datahandler		= require('./datahandler.js');
//var Test			= require('./test.js');


Knex.knex = Knex.initialize({
  client: 'mysql',
  connection: {
    host     : 'us-cdbr-azure-west-b.cleardb.com',
    user     : 'b773b54a80dfb5',
    password : '584d33e0',
    database : 'newShopDb',
    charset  : 'utf8',
    port: 3306 //1433
  }
});

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
		//test code
		//var ajax_url = 'http://apitest.retailigence.com/v2.1/products?&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_&requestorid=test&userlocation=94063&keywords=star+wars+lego';
		var ajax_url = req.body.url;
		response.ajax(ajax_url);
		break;
	case 'keywords':
		handle = new Datahandler();
		response.sendKeywods(handle.getKeywords());
		break;
	case 'products':
		handle = new Datahandler();
		longt = req.url.match(/long=([^&\/]+)/)[1];
		lat = req.url.match(/lat=([^&\/]+)/)[1];
		handle.getProducts(lat,longt,response);
		break;
	case 'remove':
		keywords = req.url.match(/key=([^&\/]+)/)[1];
		keywords = keywords.split(',');
		handle = new Datahandler();
		handle.removeKeys(keywords);
		res.send(204 );
		break;
	case 'add':
		keywords = req.url.match(/key=([^&\/]+)/)[1];
		keywords = keywords.split(',');
		handle = new Datahandler();
		handle.addKeys(keywords);
		res.send(204 );
		break;
	case 'like':
		handle = new Datahandler();
		handle.doLike(JSON.parse(req.body.object));
		res.send(204 );
		break;
	case 'dislike':
		handle = new Datahandler();
		handle.doDislike(JSON.parse(req.body.object));
		res.send(204 );
		break;
	case 'fav':
		handle = new Datahandler();
		response.sendFavs(handle.getFavs());
		break;
	case 'change':
		handle = new Datahandler();
		longt = req.url.match(/long=([^&\/]+)/)[1];
		lat = req.url.match(/lat=([^&\/]+)/)[1];
		handle.changeLocation(lat,longt,response);
		res.send(204);
		break;
	//case 'test':
	//	new Test(res);
	//	break;
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
