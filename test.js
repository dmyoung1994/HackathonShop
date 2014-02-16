'use strict';


var sql = require('mssql'); 

var config = {
    user: 'ShopNearMeAdmin',
    password: 'Shopnearme14',
    server: 'v598oe4pzx.database.windows.net,1433',
    database: 'ShopNearMe'
}

var connection = new sql.Connection(config);

//sql.connect(config, function(err) { });


//var sql = require('msnodesql');
//var conn_str = "Driver={SQL Server Native Client 10.0};Server=tcp:{v598oe4pzx}.database.windows.net,1433;Database={ShopNearMe};Uid={ShopNearMeAdmin};Pwd={Shopnearme14};Encrypt=yes;Connection Timeout=30;";

function Test(res){

    var request = new sql.Request(connection);
    // request.query('SELECT * FROM keywords', function (err, results) {
    //      if (err) {
    //          res.writeHead(500, { 'Content-Type': 'text/plain' });
    //          res.write("Got error :-( " + err);
    //          res.end("");
    //          return;
    //      }
    //      res.writeHead(200, { 'Content-Type': 'text/plain' });
    //      for (var i = 0; i < results.length; i++) {
    //          res.write("id: " + results[i].id + " keyword: " + results[i].keyword + " count: " + results[i].count);
    //      }
    //      res.end("; Done.");
    //  });
    res.send('test html');
}

module.exports      = Test;
