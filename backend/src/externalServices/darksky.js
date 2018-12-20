let config = require('config');
let rp = require('request-promise');

module.exports.forecastWeather = function forecastWeather(latitude, longitude) {

	let options = {
        uri: `https://api.darksky.net/forecast/${config.get("darksky.apiKey")}/${config.get("location.latitude")},${config.get("location.longitude")}`,
		qs: {
			units: "ca",
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