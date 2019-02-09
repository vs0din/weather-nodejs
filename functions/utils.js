'use strict';
const fetch = require('node-fetch');


const clientIP = (ip) => {
	// let ip = req.connection.remoteAddress;
	// let l = ip.lastIndexOf(':');
	// ip = ip.slice(l + 1);
	// return 'http://ip-api.com/json/' + ip;
	return 'http://ip-api.com/json/87.123.229.54'
};

const getGeo = async () => {
	const lonLat = await fetch(clientIP());
	const lonLatJson = await lonLat.json();
	return await {'lon': lonLatJson.lon, 'lat': lonLatJson.lat};
};

const getWeather = async (geo) => {
	let url = 'https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude='+geo.lat+'&longitude='+geo.lon+'&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg';
	const response = await fetch(url);
	const weatherObj = await response.json();
	const tmprObj = weatherObj.observations.location[0].observation[0];
	const location = weatherObj.observations.location[0];
	return {
		'country': location.country,
		'city': location.city,
		'temperature': tmprObj.temperature,
		'highTemperature': tmprObj.highTemperature,
		'lowTemperature': tmprObj.lowTemperature,
		'description': tmprObj.description,
		'iconLink': tmprObj.iconLink,
	};
};

const getWeatherObj = async () => {
	const geo = await getGeo();
	const weather = await  getWeather(geo);
	return await weather;
};

module.exports.getWeatherObj = getWeatherObj();