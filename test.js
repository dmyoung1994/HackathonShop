'use strict';


var sql = require('mssql'); 

var config = {
    driver: 'msnodesql',
    user: 'ShopNearMeAdmin',
    password: 'Shopnearme14',
    server: 'v598oe4pzx.database.windows.net',
    port: 1433,
    database: 'ShopNearMe',
    timeout: 30
}

//sql.connect(config, function(err) { });


//var sql = require('msnodesql');
//var conn_str = "Driver={SQL Server Native Client 10.0};Server=tcp:{v598oe4pzx}.database.windows.net,1433;Database={ShopNearMe};Uid={ShopNearMeAdmin};Pwd={Shopnearme14};Encrypt=yes;Connection Timeout=30;";

function Test(res) {
    sql.connect(config, function (err) {
	if (err) {
	    res.writeHead(500, { 'Content-Type': 'text/plain' });
	    res.write("Got connection error :-( " + err);
	    res.end("");
	    return;
	}
	res.send('Done test.');
	return;
	var request = new sql.Request();
	request.query('SELECT * FROM keywords', function (err, result) {
 	    if (err) {
 		res.writeHead(500, { 'Content-Type': 'text/plain' });
 		res.write("Got query error :-( " + err);
 		res.end("");
		return;
 	    }
	    res.send(result[0]);
	});
    });
}
module.exports      = Test;
