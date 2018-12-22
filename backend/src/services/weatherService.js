const moment = require('moment');
const config = require('config');

module.exports = function weatherServiceModule(externalWeatherService) {

    function getWeather(timeWindow) {
        let latitude = config.get("location.latitude");
        let longitude = config.get("location.longitude");
        
        return externalWeatherService.forecastWeather(latitude, longitude)
            .then(function(weatherData) { 
                let result = {
                    minimumTemperature: weatherData.daily.data[0].temperatureLow,
                    currentTemperature: weatherData.currently.temperature,
                    hourly: new Array(),
                }

                let hours = weatherData.hourly.data;
                let momentStartTime = moment(timeWindow.startTime);
                let momentEndTime = moment(timeWindow.endTime);
                
                for(let i = 0; i < hours.length; i++) {
                    let hour = hours[i];
                    let momentTime = new moment.unix(hour.time);
                    if (momentTime.isSameOrAfter(momentStartTime) && momentTime.isSameOrBefore(momentEndTime)) {
                        result.hourly.push(
                            {
                                time: momentTime.format("YYYY-MM-DD HH:mm"),
                                isDark: momentTime.isBefore(weatherData.daily.data[0].sunriseTime) || moment().isAfter(weatherData.daily.data[0].sunsetTime),
                                cloudiness: hour.cloudCover * 100,
                                chanceOfRain: hour.precipType == "rain" ? hour.precipProbability * 100 : 0,
                                chanceOfSnow: hour.precipType == "snow" || hour.precipType == "sleet" ? hour.precipProbability * 100 : 0
                            });
                    }
                }
        
                return result;
            } );
    }

    let publicApi = {
        getWeather: getWeather
    };

    return publicApi;
};

