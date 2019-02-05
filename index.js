'use strict';

const fetch = require('node-fetch');
const express = require('express');

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

	const clientIP = () => {
		let ip = req.connection.remoteAddress;
		let l = ip.lastIndexOf(':');
		ip = ip.slice(l + 1);
		// return 'http://ip-api.com/json/' + ip;
		return 'http://ip-api.com/json/87.123.229.54'
	};

	const getGeo = async () => {
		const lonLat = await fetch(clientIP());
		const lonLatJson = await lonLat.json();
		const geoObj = await {'lon': lonLatJson.lon, 'lat': lonLatJson.lat};
		return geoObj;
	}

	const getWeather = async (geo) => {
		let url = 'https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude='+geo.lat+'&longitude='+geo.lon+'&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg';
		const response = await fetch(url);
		const json = await response.json();
		const obj = {
			'country': json.observations.location[0].country,
			'city': json.observations.location[0].city,
			'temperature': json.observations.location[0].observation[0].temperature,
			'highTemperature': json.observations.location[0].observation[0].highTemperature,
			'lowTemperature': json.observations.location[0].observation[0].lowTemperature,
			'description': json.observations.location[0].observation[0].description,
			'iconLink': json.observations.location[0].observation[0].iconLink,
		};
		return obj;
	};

	const handleData = async () => {
		const geo = await getGeo();
		const weather = await getWeather(geo);
		res.send(getBlockWithData(weather))
	};

	handleData();

});

app.get('/', (req, res) => res.send('<h1>sss</h1>'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));