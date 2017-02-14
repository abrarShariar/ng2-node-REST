const express = require('express');
const api = express();
const mysql = require('mysql');
const file_watcher = require('./file_watcher.js');


//create connection
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'movieDB'
});
//check connection
connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

/*
*ROUTES for RESTful backend
*/

api.get('/',function(req, res){
	res.send('Hello World !!');
});

//send all rows from all_videos 
api.get('/all',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	connection.query('SELECT * FROM `all_videos` ', function(error, results, fields){
		if (error) throw error; 
		if(results.length <= 0){
			res.send('NULL');
		}else{
			res.json(results);
		}
	});
});

//send all data from all_videos for /:id
api.get('/id=:id',function(req,res){
	res.setHeader('Content-Type', 'application/json');
	connection.query('SELECT * FROM `all_videos` WHERE `id` = ?',req.params.id,function(error, results, fields){
		if(error) throw error;
		if(results.length <= 0){
			res.json('NULL');
		}else{
			res.json(results);
		}
	});
});


api.listen(8080,function(){
	console.log('Listening to port 8000');
	file_watcher.startFileWatcher();
});