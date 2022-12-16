require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const http = require('http');
const https = require('https');
const fs = require('fs');
const configs = require('./config.json');
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(
	cors({
		//origin: process.env.CLIENT_URL
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // folder to upload files

global.__basedir = __dirname; // very important to define base directory of the project. this is useful while creating upload scripts

// Routes
app.get('/', (req, res, next) => {
	try {
		res.json({
			status: 'success',
			message: 'Welcome 🙏',
		});
	} catch (err) {
		return next(err);
	}
});

const taskRoute = require('./routes/taskRoute');
const userRoute = require('./routes/userRoute');
const mifosRoute = require('./routes/mifosRoute');
app.use('/api', mifosRoute); // you can add more routes in this array

//404 error
app.get('*', function (req, res) {
	res.status(404).json({
		message: 'What?? 🙅',
	});
});

//An error handling middleware
app.use((err, req, res, next) => {
	console.log('🐞 Error Handler');

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		err: err,
	});
});

// Run the server
const port = process.env.PORT || configs.port;
// app.listen(port, () =>
// 	console.log(`🐹 app listening on http://localhost:${port}`)
// );

var  privateKey, certificate, caBundle;

try {
	if (fs.existsSync('/etc/pki/tls/private/apitemplate.sandbox.co.ke.key')) {
		privateKey = fs.readFileSync('/etc/pki/tls/private/apitemplate.sandbox.co.ke.key', 'utf8');
		certificate = fs.readFileSync('/etc/pki/tls/certs/apitemplate.sandbox.co.ke.cert', 'utf8');
		caBundle = fs.readFileSync('/etc/pki/tls/certs/apitemplate.sandbox.co.ke.bundle', 'utf8');
	} 
} catch (error) {
	console.log("Running node.js on local server.");
};

var certificate_options = { key: privateKey, cert: certificate, ca: caBundle };

var httpServer = http.createServer(app);
var httpsServer = https.createServer(certificate_options,app);
httpServer.listen(process.env.PORT);
httpsServer.listen(configs.port);

console.log(`🐹 app listening on http://localhost:${port}`);

