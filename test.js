'use strict';


var sql = require('mssql');
//var sql = require('msnodesql');

var config = {
	driver: 'msnodesql',
	user: 'ShopNearMeAdmin',
	password: 'Shopnearme14',
	server: 'v598oe4pzx.database.windows.net',
	port: 1433,
	database: 'ShopNearMe',
	timeout: 30
};
//var conn_str = "Driver={SQL Server Native Client 10.0};Server=tcp:{v598oe4pzx}.database.windows.net,1433;Database={ShopNearMe};Uid={ShopNearMeAdmin};Pwd={Shopnearme14};Encrypt=yes;Connection Timeout=30;";

function Test(res) {
	var output = '';
	try{
		sql.connect(config, function (err) {
			if (err) {
				throw err;
			}
			output += 'Done Test';
			var request = new sql.Request();
			request.query('SELECT * FROM keywords', function (err, result){
				if (err) {
					throw err;
				}
				output += ' did query:'+result;
			});
		});
	}catch(error){
		res.send(res);
	}finally{
		res.send(output);
	}
}
module.exports      = Test;

