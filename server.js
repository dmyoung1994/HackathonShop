'use strict';

var express         = require('express'),
//jade                = require('jade');  //declare globally
	events          = require('events'),
	Response		= require('./response.js'),
	server          = new events.EventEmitter();    //will be used in child modules

//Global
//jade.options        = {filename: '',debug: false};
//jade.files          = ['home','view'];  //names of template files written in jade
//jade.fnames         = {home: 'home.jade',view: 'view.jade'}
//jade.page           = {}; //holds html content from jade files (parses them once for multiple servings)
//parse all jade files
/*for (var i=0;i<jade.files.length;i++){
	jade.page[jade.files[i]] = 'Hello World';
	jade.renderFile(jade.files[i]+'.jade', jade.options, function (err, text) {
		if (err) throw err;
		jade.page[jade.files[i]] = text;
	});
}*/
var app = express();
app.locals.tags     = null;
app.locals.view     = {};       //stores output for every tag
//ignore static file requests
app.use('/static',express.static(__dirname+'/static'));
app.use('/favicon.ico',express.static(__dirname+'/favicon.ico'));

app.use(express.bodyParser());

//!!!!!!!!!!!!!SET WEB SERVER LISTENER!!!!!!!!!!!!!!!!!!!
app.use(function(req, res){//, next){
	console.log('%s %s', req.method, req.url);
	var response = new Response(res);
	var action = req.url.match(/\/([a-z]+)/)[1];
	switch(action){
	case 'ajax':
		console.log('ajax');
		//test code
		//var ajax_url = 'http://apitest.retailigence.com/v2.1/products?&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_&requestorid=test&userlocation=94063&keywords=star+wars+lego';
		var ajax_url = req.body.url;
		response.ajax(ajax_url);
		break;
	case 'keywords':
		console.log('keywords');
		break;
	case 'remove':
		console.log('remove');
		break;
	case 'add':
		console.log('add');
		break;
	case 'fav':
		console.log('fav');
		break;
	case 'change':
		console.log('change');
		break;
	default:
		//send test output
		res.send('hello');
		break;
	}
	/*
	jade.renderFile(jade.fnames['view'], 
		{
			filename: '',
			debug: false,
			globals: ['app.locals.tags','app.locals.view']
		}, function (err, text) {
		if (err) throw err;
		res.send(text);
	});
	*/
});
app.listen(8888);