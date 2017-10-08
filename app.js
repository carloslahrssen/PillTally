var express = require('express');
var request = require('request');
var axios = require('axios');
var FormData = require('form-data');
var app = express();
var form = new FormData();


function getToken(){
	return new Promise((resolve, reject) => {
		const api_key = "016837e1ddfb406e00814bc11aec84f4:ec43d02adc0c7d1b08386505d2c3d7f0b1ec7aeec25fe1917724f4dd4aef1e51";

		const encode = (key) => {
			return new Buffer(
				new Buffer(key).toString('ascii')
			).toString('base64')
		};

		request.post({
			headers: {'Authorization':`Basic ${encode(api_key)}`},
			url:'https://api.powerdms.com/auth/connect/token',
			body: 'grant_type=password&scope=openid+profile+tnt_profile+privileges&username=masteradmin1&password=UCFHackathon!1&acr_values=tenant%3AUCFHackathon2017'
		}, function(error, response, body){
			error && reject(err);
			resolve(body);
		});
	});
};

let api = axios;

console.log('setting api instance');
getToken()
	.then(tkn => {
		// console.log('le token', JSON.parse(tkn))
		const {access_token, token_type} = JSON.parse(tkn);
		api = axios.create({
			baseURL: 'https://api.powerdms.com/v1/',
			timeout: 10000,
			headers: { 
				'Accept': 'application/json',
				'Authorization': `${token_type} ${access_token}`
			}
		});
		console.log('api insance set');
	})
	.catch(err => console.log('====== le errr', err));



app.set('view engine', 'pug');
app.use(express.static(__dirname+'/public'));

app.get('/test', (req, res) => {
	const id = 228479;
	api.get(`/documents/${id}/`)
		.then(data => res.json(data.data))
		.catch(err => console.log(err) && res.json({err: 'afafafn adg sf'}));
});

app.get('/revise', (req, res) => {
	const id = 228479;
	form.append("file", "<html><head></head><body><h1>Test</h1></body></html>", {
		contentType: 'text/html',
		filename: 'html1.html'
	});
	console.log(form);
	api.post(`/documents/${id}/revisions/321671/content`, form, 
	{
		headers: {
			'Content-Type': 'multipart/form-data boundary=' + form.getBoundary()
		}
	}
	 )
		.then(data => res.json(data.data))
		.catch(err => console.log(err) && res.json({err: 'afafafn adg sf'}));	
});

app.get('/', function(req,res){
	res.render('index');
});

app.get('/addInfo', function(req, res){

});

app.listen(3000, function(){
	console.log("Listening port 3000");
});