const config = require('config');
const rp = require('request-promise');

module.exports.getMeasurement = function getMeasurement(latitude, longitude) {

	let options = {
		uri: 'https://airapi.airly.eu/v1/nearestSensor/measurements',
		qs: {
			latitude: latitude,
			longitude: longitude,
			maxDistance: 10000
		},
		headers: {
			apikey: config.get('airly.apiKey')
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