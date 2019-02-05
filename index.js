'use strict';

const fetch = require('node-fetch');
const express = require('express');
const fetchJson = require('fetch-json');

//fetch('http://51.75.67.87:8080/ukrnet')
//    .then(res => res.json())
//    .then(json => {
//      json.map((data => {
//        return console.log(data.text)
//      }))
//  });
const app = express();
const port = 3000;

app.set('view engine', 'html');
app.set('trust proxy')

app.get('/weatherFrame', (req, res) => {

	const getBlockWithData = (o) => {
		return `<div class="card warp" style="width: 18rem;">
                <img class="warp" style='max-width 100%; and height :auto' src="${o.iconLink}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-text">Location ${o.city}, ${o.country}</h5>
                  <p class="card-text">Temperature now : ${Math.round(o.temperature)}°</p>
                  <p class="card-text">Hightest temperature today: ${Math.round(o.highTemperature)}°</p>
                  <p class="card-text">Lowest temperature today: ${Math.round(o.lowTemperature)}°</p>
                  <h6 class="card-text">Description: ${(o.description)}</h6>
                </div>
                </div>`
	};

	const handleData = (json) => {
		const obj = {
			'country': json.observations.location[0].country,
			'city': json.observations.location[0].city,
			'temperature': json.observations.location[0].observation[0].temperature,
			'highTemperature': json.observations.location[0].observation[0].highTemperature,
			'lowTemperature': json.observations.location[0].observation[0].lowTemperature,
			'description': json.observations.location[0].observation[0].description,
			'iconLink': json.observations.location[0].observation[0].iconLink,
		};
		res.send(getBlockWithData(obj))
	};

	const clientIP = () => {
		let ip = req.connection.remoteAddress;
		let l = ip.lastIndexOf(':');
		ip = ip.slice(l + 1);
		return ip;
	};

	let url = 'https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude=50.1025&longitude=8.6299&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg';

	// const lonLat = (json) => {
	// 	const obj = {
	// 		'lon': json.lon,
	// 		'lat': json.lat,
	// 	};
	// 	return url
	// };

	// const getGeoByIp = () => {
	// 	let url = 'http://ip-api.com/json/' + clientIP();
	// 	fetchJson.get(url).then(lonLat)
	// };

	fetchJson.get(url).then(handleData);

});

app.get('/', (req, res) => res.send('<h1>sss</h1>'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));