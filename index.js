'use strict';

const express = require('express');
const utils = require('./functions/utils');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('trust proxy');

app.get('/weatherFrame', async (req, res) => {

		const weather = await utils.getWeatherObj;
		res.render('index', {weather}) // в пуге передавать надо ту же переменную что туда попадает

});

app.get('/', function (req, res) {
	res.render('helloWorld');
});app.listen(port, () => console.log(`Example app listening on port ${port}!`));