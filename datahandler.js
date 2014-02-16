'use strict';

var Q         = require('q'),
	URL = require('url'),
	http = require('http'),
	_ = require('lodash'),
	knex = require('knex').knex,
	NUMBER_OF_KEYWORDS_TO_RETURN = 10,
	DEFAULT_RANGE = 100,
	API_URL = 'http://apitest.retailigence.com/v2.1/products?&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_&requestorid=test&range='+DEFAULT_RANGE+'&';

var KEYWORDS_STORE = {'television': 1,'iphone': 1,'phone':1,'electronics': 1};
var LIKES = {};
var DISLIKES = {};
function Datahandler(){
	//@param zipcode - zipcode of the location
	this.changeLocation = function(lat,longt,res){
		//we don't care about getting a response immediately
		return Q.ninvoke(this,'getProducts', lat,longt,res,false);
	};
	//returns a list of top NUMBER_OF_KEYWORDS_TO_RETURN (10) keywords
	this.getKeywords = function(){
		var numSort = function(a,b){
			return b[1]-a[1];
		};
		var rows = [];
		_(KEYWORDS_STORE).forIn(function(count,key){
			rows.push([key,count]);
		});
		rows.sort(numSort);
		return rows.slice(0,NUMBER_OF_KEYWORDS_TO_RETURN);
		//var keywords = ['apple','iphone','television','electronics'];	//fake keywords
		/*knex('keywords')
		.where('keyword','ilike','%fdsfds%')		//.where('keyword','ilike','%fdsfds%')
		.orderBy('count','desc')
		.limit(10).select('keyword','count')
		.then(function(result){
			var keywords = [];
			_(result).forEach(function(val){
				keywords.push([val[0], val[1]]);
			});
			res.sendKeywods(keywords);
		});*/
	};
	//return a list of favorite products
	this.getFavs = function(){
		var products = [{"product":{"id":"bc794b5c-07a7-4716-94cf-57fb9a65e6a7","name":"Lego Star Wars 75021",
			"images":[
			{"ImageInfo":
				{"imageName":"LARGE",
				"link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=l:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}},
				{"ImageInfo":{"imageName":"SMALL","link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=s:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}}],
				"url":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=p:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_",
				"productType":["Video Games & Toys","Toys"]},"retailer":{"id":"91022948-671b-4a76-a61e-3fee8a7e68ca"}},
				{"product":{"id":"bc794b5c-07a7-4716-94cf-57fb9a65e6a7","name":"Lego Star Wars 75021",
			"images":[
			{"ImageInfo":
				{"imageName":"LARGE",
				"link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=l:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}},
				{"ImageInfo":{"imageName":"SMALL","link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=s:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}}],
				"url":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=p:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_",
				"productType":["Video Games & Toys","Toys"]},"retailer":{"id":"91022948-671b-4a76-a61e-3fee8a7e68ca"}},
				{"product":{"id":"bc794b5c-07a7-4716-94cf-57fb9a65e6a7","name":"Lego Star Wars 75021",
			"images":[
			{"ImageInfo":
				{"imageName":"LARGE",
				"link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=l:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}},
				{"ImageInfo":{"imageName":"SMALL","link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=s:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}}],
				"url":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=p:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_",
				"productType":["Video Games & Toys","Toys"]},"retailer":{"id":"91022948-671b-4a76-a61e-3fee8a7e68ca"}}];
		return products;
	};
	this.doDislike = function(data){
		var keywords = data.keywords;
		var product_id = data.productID;
		var retailer_id = data.retailID;
		this.removeKeys(keywords);

		if (typeof DISLIKES[product_id] === 'undefined'){
			DISLIKES[product_id] = {retailer_id: 1};
		}else{
			DISLIKES[product_id][retailer_id] = 1;
		}
		//persist data in a db
		_(keywords).forEach(function(key){
			if (typeof KEYWORDS_STORE[key] === 'undefined'){
				KEYWORDS_STORE[key] = 0
			}else{
				KEYWORDS_STORE[key]--;
			} 
		});
	};
	this.doLike = function(data){
		var keywords = data.keywords;
		var product_id = data.productID;
		var retailer_id = data.retailID;
		var json = {product: {name: data.name, image: data.image, buyUrl: data.buyUrl}}

		if (typeof LIKES[product_id] === 'undefined'){
			LIKES[product_id] = {retailer_id: json};
		}else{
			LIKES[product_id][retailer_id] = json;
		}
		this.addKeys(keywords);
		//persist data in a db
		_(keywords).forEach(function(key){
			if (typeof KEYWORDS_STORE[key] === 'undefined'){
				KEYWORDS_STORE[key] = 0
			}else{
				KEYWORDS_STORE[key]++;
			} 
		});
	};
	this.getProducts = function(lat,longt,res,is_output_raw){
		if (typeof is_output_raw === 'undefined'){
			is_output_raw = true;
		}
		var myRes = res;
		//get current keywords
		var keywords = this.getKeywords();
		//construct the url
		var location = lat+','+longt;
		var url_string = API_URL+'userlocation='+location+'&keywords='+keywords.join('+');
		var email_keyword = keywords.shift();

		var address = URL.parse(url_string);
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
				if (is_output_raw){
					myRes.out(body);
				}else{
					myRes.sendEmail(body,email_keyword);
				}
				// ...and/or process the entire body here.
			});
		});

		req.on('error', function(e) {
			console.log('ERROR: ' + e.message);
		});
	};
	this.executeRemove = function(somedata) {
		_(somdata).forEach(function(val){
			if (typeof KEYWORDS_STORE[val] !== 'undefined'){
				console.log('removing a key:'+val);
				KEYWORDS_STORE[val]--;
				if (KEYWORDS_STORE[val] < 0){
					delete KEYWORDS_STORE[val];
				}
			}
		})
	};
	this.executeAdd= function(somedata) {
		_(somdata).forEach(function(val){
			if (typeof KEYWORDS_STORE[val] === 'undefined'){
				console.log('adding a key:'+val);
				KEYWORDS_STORE[val] = 1;
			}else{
				KEYWORDS_STORE[val]++;
			}
		})
	};
	//@param keywords - an array of keywords
	this.removeKeys = function(keywords){
		return Q.ninvoke(this,'executeRemove', keywords);
	};
	//@param keywords - an array of keywords
	this.addKeys = function(keywords){
		return Q.ninvoke(this,'executeAdd', keywords);
	};
};

module.exports      = Datahandler;