/**
 * Device Register ID Authentication
 */

app.post('/register_authentication', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	console.log(JSON.stringify(req.body.id));
	console.log(JSON.stringify(req.body.passwd));
	var connection =  connDB();
	connection.connect();
	connection.query('SELECT * FROM rtes_member WHERE mb_id='+mysql.escape(req.body.id)+' and mb_password='+mysql.escape(req.body.passwd) , function(err, results, fields){
		if(err)
			throw err;
		console.log(JSON.stringify(results));
		if(results.length > 0) {//authentication ok
			res.send({'msg':'success'});
		}
		else {
			res.send({'msg':'retry'});
		}
	});
	
	connection.end();
});

app.post('/register_id', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	console.log(JSON.stringify(req.body.email));
	console.log(JSON.stringify(req.body.register_id));
	var connection =  connDB();
	connection.connect();
	//updateDB
	connection.query('Update rtes_member Set mb_register_id='+mysql.escape(req.body.register_id)+' Where mb_id='+mysql.escape(req.body.id), function(err, rows){
		var msg = 'success';
		if(err) {
			msg = 'fail';
			throw err;
		}
		console.log(rows);
		res.send({'msg':msg});
	});
	connection.end();
});