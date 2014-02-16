'use strict';


var Knex = require('knex');

var knex = Knex.initialize({
  client: 'mysql',
  connection: {
    host     : 'us-cdbr-azure-west-b.cleardb.com',
    user     : 'b773b54a80dfb5',
    password : '584d33e0',
    database : 'newShopDb',
    charset  : 'utf8',
    port: 1433
  }
});
//MYSQLCONNSTR_my_default_connection_string
//CUSTOMCONNSTR_
//my_default_connection_value

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
				try{
					if (err) {
						throw err;
					}
					output += ' did query:'+result;
				}catch(error){
					res.send('error1:'+error);
				}finally{
					res.send(output);
				}
			});
		});
	}catch(error){
		res.send('error2:'+error);
	}finally{
		res.send(output);
	}
}
module.exports      = Test;

