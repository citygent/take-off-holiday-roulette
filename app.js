const express = require('express');
const bodyParser = require('body-parser'); // additional body parsing
const PORT = process.env.PORT || 8080
const morgan = require('morgan'); // General request logger
const path = require('path'); // path.join
const pp = function(s){ return path.join(__dirname, s); };
const app = express();
const server = require('http').createServer(app); // or https
const sql = require('mssql');

// Pug template engine - previously Jade - http://jade-lang.com/
app.set('views', pp('views')); // where templates are located
app.set('view engine', 'pug'); // Express loads the module internally

// Add top-level (could be made route-specific) parsers that will populate request.body
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

app.use(morgan('dev')); // Set up logger
const debug = require('./utils/debug'); // + my own logger
app.use(debug.requestInfo); // Middleware function - Order/Place of call important!

// Expose urls like /static/images/logo.png 
app.use('/static', express.static(pp('public'))); // first arg could be omitted

app.get('/', function (req, res) {
  	res.render('index', 
		{ title: 'Demo', data: { name: "Shop", items: [3, 5, 8] } } 
	); 
})

app.get('/connect', function (req, res) {
	sql.connect("mssql://sam:pass123!@takeoff.database.windows.net:1433/Wolverines").then(function() {
		console.log("connected");
    // Query 
		new sql.Request().query('select * from mytable').then(function(recordset) {
			console.dir(recordset);
			res.send("ok");
		}).catch(function(err) {
			// ... query error checks 
		});
	}).catch(function(err) {
		// ... connect error checks 
	});
});


/* Specify both GET and POST endpoint */
app.route('/debug') 
	.get(function(req, res) {
		var info = req.requestInfo;
		res.jsonPretty(info); // custom method
	})
	.post(function(req, res) {
		// Or with status: res.status(500).json({ error: 'message' });
		res.json(req.requestInfo);
	});


server.listen(PORT, function() {
	var host = server.address().address;
	var port = server.address().port;
	// console.log(app.get('env'));
	console.log("Server dir: " + pp('/'));
	console.log((new Date()).toLocaleTimeString() + " - Server running at http://localhost:" + port);
});
