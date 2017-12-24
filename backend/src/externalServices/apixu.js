let config = require('config');
let rp = require('request-promise');

module.exports.forecastWeather = function forecastWeather(query, noOfDays) {

	let options = {
		uri: 'http://api.apixu.com/v1/forecast.json',
		qs: {
			key: config.get('Apixu.ApiKey'),
			q: query,
			days: noOfDays
		},
		json: true
	}

	return rp(options)
		.then(function (response) {
				return response;
		})
		.catch(function (err) {
				console.log(err);
		});
}