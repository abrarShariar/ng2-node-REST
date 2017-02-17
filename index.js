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
api.get('/api/all',function(req, res){
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
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
api.get('/api/video/detail/:id',function(req,res){
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
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

//send count of all videos
api.get('/api/videos/total_count',function(req, res){
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Content-Type', 'application/json');
	connection.query('SELECT COUNT(*) AS video_count FROM `all_videos`',function(error, results, fields){
		if(error) throw error;
		if(results.length <= 0){
			res.json('NULL');
		}else{
			res.json(results);
		}
	});
});

// //drop all_videos table from DB
// api.get('/api/videos/drop/all_videos',function(req, res){
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
// 	res.setHeader('Content-Type', 'application/json');
// });

//restart / start file watcher
api.get('/api/file_watcher/start',function(req, res){
	if(file_watcher.stopFileWatcher()){
		file_watcher.startFileWatcher();		
	}else{
		file_watcher.startFileWatcher();		
	}
});

//for username and password verification 
api.post('/admin/verify',function(req,res){
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.json(req.body);
});

api.listen(8080,function(){
	console.log('Listening to port 8080');
	file_watcher.startFileWatcher();
});