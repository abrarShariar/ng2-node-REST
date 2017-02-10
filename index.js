const express = require('express');
const app = express();
const mysql = require('mysql');
var file_watcher = require('./file_watcher.js');

//ROUTES for RESTful backend
app.get('/',function(req, res){

});

app.listen(8000,function(){
	console.log('Listening to port 8000');
	file_watcher.startFileWatcher();
});