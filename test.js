'use strict';

var knex = require('knex').knex;
//MYSQLCONNSTR_my_default_connection_string
//CUSTOMCONNSTR_
//my_default_connection_value

function Test(res) {
	console.log('test');
	var output = '';
	try{
		knex('keywords')
			.where('keyword','ilike','%fdsfds%')
			.limit(1).select()
			.then(function(result){
				console.log(result);
			});
	}catch(error){
		console.log(error);
	}finally{
		console.log('success query');
	}
}
module.exports      = Test;

