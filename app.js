const express = require('express');
const path = require('path');
const { Client } = require('pg');

// instantiate client using your DB configurations
const client = new Client({
	database: 'mydb',
	user: 'postgres',
	password: 'admin',
	host: 'localhost',
	port: 5432
});

// connect to database
client.connect()
	.then(function() {
		console.log('connected to database!')
	})
	.catch(function(err) {
		console.log('cannot connect to database!')
	});

const app = express();
// tell express which folder is a static/public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
	res.send('Hello Express!!!');
});

app.get('/about', function(req, res) {
	res.send('<h1>About Page</h1>');
});

app.get('/api/products', function(req, res) {

	client.query('SELECT * FROM Products', (req, data)=>{
		console.log(data.rows);
		res.json({
			data: data.rows
		})
	})
});
app.get('/user/:userName', function(req, res) {
	const userName = req.params.userName;
	res.send('<h1>Hi,' + userName + '!!</h1>');
});


app.listen(3000, function() {
	console.log('Server started at port 3000');
});