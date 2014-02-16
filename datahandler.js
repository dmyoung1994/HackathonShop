'use strict';

var Q         = require('q');
var URL = require('url');
var http = require('http');

var NUMBER_OF_KEYWORDS_TO_RETURN = 10;
var API_URL = 'http://apitest.retailigence.com/v2.1/products?&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_&requestorid=test&';

function Datahandler(){
	//@param zipcode - zipcode of the location
	this.changeLocation = function(lat,longt,res){
		//we don't care about getting a response immediately
		return Q.ninvoke(this,'getProducts', lat,longt,res,true);
	};
	//returns a list of top NUMBER_OF_KEYWORDS_TO_RETURN (10) keywords
	this.getKeywords = function(){
		var keywords = ['apple','iphone','television','electronics'];	//fake keywords
		return keywords;
	};
	//return a list of favorite products
	this.getFavs = function(){
		var products = [{"product":{"id":"bc794b5c-07a7-4716-94cf-57fb9a65e6a7","externalproductid":"7832659","model":"75021","weight":0.0,"msrpCurrency":"USD","name":"Lego Star Wars 75021","descriptionLong":"Rescue the heroes with the LEGO® Star Wars™ Republic Gunship™!","barcode":"00673419191401","brand":"Lego","images":[{"ImageInfo":{"imageName":"LARGE","link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=l:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}},{"ImageInfo":{"imageName":"SMALL","link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=s:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}}],"sku":"7832659","descriptionShort":"Rescue the heroes with the LEGO® Star Wars™ Republic Gunship™!","url":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=p:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_","productType":["Video Games & Toys","Toys"]},"distance":{"distance":6.805069722670021,"units":"miles"},"price":"119.99","location":{"id":"7de5e7f7-c9bd-4586-8d05-8c5f42b9b064","timezone":"America\/Los_Angeles","distance":{"distance":6.805069722670021,"units":"miles"},"phone":"6504966000","tnavLink":"http:\/\/apps.scout.me\/v1\/driveto?dt=340+Portage+Ave+Palo+Alto+CA+94306@37.422339,-122.137674&token=s6iLlaxu-k6-J92rQBlaPvozpxUPAAPhbIlKgFy5X_XcyFLYv6iVIkXH4rOPIvZDR1duzTMYCzrFYAMkx2Q3RILIva9TGKubnreoRxaAv_2uRGGItiCo-FJA9sJA9EPtSO70OFeu7LDg06EZxiQjxU_CKNfi76c_-ImDVGNCocQ&name=Frys+-+Palo+Alto","location":{"longitude":-122.137674,"latitude":37.422339},"address":{"postal":"94306","state":"CA","address1":"340 Portage Ave","country":"US","city":"Palo Alto"},"mapLink":"http:\/\/maps.google.com\/maps?q=340+Portage+Ave+Palo+Alto+CA+94306","name":"Frys - Palo Alto","retailer":{"id":"91022948-671b-4a76-a61e-3fee8a7e68ca","logo":"http:\/\/bi2.retailigence.com\/img\/logo\/frys-120x30.jpg","phs":1,"name":"Frys","logosq":"http:\/\/bi2.retailigence.com\/img\/logo\/frys-50x50.jpg"},"retlocationid":"3"},"inventory":"http:\/\/apitest.retailigence.com\/v2.1\/inventory?apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_&productId=bc794b5c-07a7-4716-94cf-57fb9a65e6a7&locationId=7de5e7f7-c9bd-4586-8d05-8c5f42b9b064&format=JSON","reserveURL":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=b:bc794b5c-07a7-4716-94cf-57fb9a65e6a7&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_","lastUpdated":"2014-02-13T19:03:01.795Z","currency":"USD"},
		{"product":{"model":"9003363","msrpCurrency":"USD","weight":0.0,"productCategory":["Gifts"],"barcode":"00830659003363","sku":"4701212","productType":["GIFTS"],"id":"818b6d3a-b5f7-49e2-9f0f-24c8a6601181","externalproductid":"1218511831830","msrp":"5.99","color":["Green\/Black"],"name":"LEGO - Star Wars Boba Fett Watch - Green\/Black","descriptionLong":"Pair style and function with this LEGO Star Wars 9003363 watch that is powered by Japanese quartz movement and features mineral glass crystal for dependability and long-lasting wear. The Boba Fett design offers a fun, stylish look.","images":[{"ImageInfo":{"imageName":"LARGE","link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=l:818b6d3a-b5f7-49e2-9f0f-24c8a6601181&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}},{"ImageInfo":{"imageName":"SMALL","link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=s:818b6d3a-b5f7-49e2-9f0f-24c8a6601181&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}}],"brand":"LEGO","descriptionShort":"2 interchangeable bezels; extra links; Japanese quartz movement; crown stopper; mineral glass crystal; water-resistant up to 169.5'; Boba Fett design; includes Boba Fett mini figure"},"distance":{"distance":2.0919911983940613,"units":"miles"},"price":"5.99","location":{"id":"b3475653-f135-4c52-8dca-e1b3c51955b7","timezone":"America\/Los_Angeles","distance":{"distance":2.0919911983940613,"units":"miles"},"phone":"6506220050","tnavLink":"http:\/\/apps.scout.me\/v1\/driveto?dt=1127+Industrial+Rd+San+Carlos+CA+94070@37.501781,-122.24272&token=s6iLlaxu-k6-J92rQBlaPvozpxUPAAPhbIlKgFy5X_XcyFLYv6iVIkXH4rOPIvZDR1duzTMYCzrFYAMkx2Q3RILIva9TGKubnreoRxaAv_2uRGGItiCo-FJA9sJA9EPtSO70OFeu7LDg06EZxiQjxU_CKNfi76c_-ImDVGNCocQ&name=Best+Buy+-+San+Carlos","location":{"longitude":-122.24272,"latitude":37.501781},"address":{"postal":"94070","state":"CA","address1":"1127 Industrial Rd","country":"US","city":"San Carlos"},"hours":"2:10:00:AM:9:00:PM,3:10:00:AM:9:00:PM,4:10:00:AM:9:00:PM,5:10:00:AM:9:00:PM,6:10:00:AM:9:00:PM,7:10:00:AM:9:00:PM,1:10:00:AM:8:00:PM","mapLink":"http:\/\/maps.google.com\/maps?q=1127+Industrial+Rd+San+Carlos+CA+94070","name":"Best Buy - San Carlos","retailer":{"id":"37207e12-12f5-4de2-a7a2-b70feb230df2","logo":"http:\/\/bi2.retailigence.com\/img\/logo\/bestbuy-120x30.jpg","phs":1,"name":"Best Buy","logosq":"http:\/\/bi2.retailigence.com\/img\/logo\/bestbuy-50x50.jpg"},"retlocationid":"140"},"inventory":"http:\/\/apitest.retailigence.com\/v2.1\/inventory?apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_&productId=818b6d3a-b5f7-49e2-9f0f-24c8a6601181&locationId=b3475653-f135-4c52-8dca-e1b3c51955b7&format=JSON","lastUpdated":"2014-02-15T19:44:03.175Z","currency":"USD"},
		{"product":{"model":"9002908","msrpCurrency":"USD","weight":0.0,"productCategory":["Gifts"],"barcode":"00830659002908","sku":"4701151","productType":["GIFTS"],"id":"6dec5d0b-08f1-40a1-abb1-72674fb2e39c","externalproductid":"1218511830548","msrp":"9.99","color":["Red\/Black"],"name":"LEGO -Star WarsDarth Vader Watch - Red\/Black","descriptionLong":"Keep track of time with this LEGO Star Wars 9002908 watch that features a stylish Darth Vader design and is powered by Japanese quartz movement for reliable use. The 2 interchangeable bezels allows simple customization.","images":[{"ImageInfo":{"imageName":"LARGE","link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=l:6dec5d0b-08f1-40a1-abb1-72674fb2e39c&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}},{"ImageInfo":{"imageName":"SMALL","link":"http:\/\/apitest.retailigence.com\/v2.1\/rdr?id=s:6dec5d0b-08f1-40a1-abb1-72674fb2e39c&requestId=9ac2e76d-073a-415e-bb9f-360ed9161ff9&apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_"}}],"brand":"LEGO","descriptionShort":"2 interchangeable bezels; extra links; Japanese quartz movement; crown stopper; mineral glass crystal; water-resistant up to 169.5'; Darth Vader design; includes Darth Vader mini figure"},"distance":{"distance":2.0919911983940613,"units":"miles"},"price":"9.99","location":{"id":"b3475653-f135-4c52-8dca-e1b3c51955b7","timezone":"America\/Los_Angeles","distance":{"distance":2.0919911983940613,"units":"miles"},"phone":"6506220050","tnavLink":"http:\/\/apps.scout.me\/v1\/driveto?dt=1127+Industrial+Rd+San+Carlos+CA+94070@37.501781,-122.24272&token=s6iLlaxu-k6-J92rQBlaPvozpxUPAAPhbIlKgFy5X_XcyFLYv6iVIkXH4rOPIvZDR1duzTMYCzrFYAMkx2Q3RILIva9TGKubnreoRxaAv_2uRGGItiCo-FJA9sJA9EPtSO70OFeu7LDg06EZxiQjxU_CKNfi76c_-ImDVGNCocQ&name=Best+Buy+-+San+Carlos","location":{"longitude":-122.24272,"latitude":37.501781},"address":{"postal":"94070","state":"CA","address1":"1127 Industrial Rd","country":"US","city":"San Carlos"},"hours":"2:10:00:AM:9:00:PM,3:10:00:AM:9:00:PM,4:10:00:AM:9:00:PM,5:10:00:AM:9:00:PM,6:10:00:AM:9:00:PM,7:10:00:AM:9:00:PM,1:10:00:AM:8:00:PM","mapLink":"http:\/\/maps.google.com\/maps?q=1127+Industrial+Rd+San+Carlos+CA+94070","name":"Best Buy - San Carlos","retailer":{"id":"37207e12-12f5-4de2-a7a2-b70feb230df2","logo":"http:\/\/bi2.retailigence.com\/img\/logo\/bestbuy-120x30.jpg","phs":1,"name":"Best Buy","logosq":"http:\/\/bi2.retailigence.com\/img\/logo\/bestbuy-50x50.jpg"},"retlocationid":"140"},"inventory":"http:\/\/apitest.retailigence.com\/v2.1\/inventory?apikey=Du8n2qqsHT7bKDvBnCyzpAaXo3vjzyo_&productId=6dec5d0b-08f1-40a1-abb1-72674fb2e39c&locationId=b3475653-f135-4c52-8dca-e1b3c51955b7&format=JSON","lastUpdated":"2014-02-15T19:44:03.175Z","currency":"USD"}
		];
		return products;
	};
	this.doDislike = function(data){
		var keywords = data.product.productType.split(',');
		this.removeKeys(keywords);
		//persist data in a db
	};
	this.doLike = function(data){
		var keywords = data.product.productType.split(',');
		this.addKeys(keywords);
		//persist data in a db
	};
	this.getProducts = function(lat,longt,res,is_output_raw){
		var myRes = res;
		//get current keywords
		var keywords = this.getKeywords();
		//construct the url
		var location = lat+','+longt;
		var url_string = API_URL+'userlocation='+location+'&keywords='+keywords.join('+');
		var email_keyword = keywords.shift();
		console.log(url_string);

		var address = URL.parse(url_string);
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
				if (is_output_raw){
					myRes.out(body);
				}else{
					myRes.sendEmail(body,email_keyword);
				}
				console.log('BODY: ' + body);
				// ...and/or process the entire body here.
			});
		});

		req.on('error', function(e) {
			console.log('ERROR: ' + e.message);
		});
	};
	this.executeRemove = function(somedata) {
		console.log('executeRemove');
	};
	this.executeAdd= function(somedata) {
		console.log('executeAdd');
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