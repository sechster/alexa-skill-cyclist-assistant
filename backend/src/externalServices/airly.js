const config = require('config');
const rp = require('request-promise');

module.exports.getMeasurement = function getMeasurement(latitude, longitude) {

	let options = {
		uri: 'https://airapi.airly.eu/v2/measurements/nearest',
		qs: {
			lat: latitude,
			lng: longitude,
			maxDistanceKM: 200
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