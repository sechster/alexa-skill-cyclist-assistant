const moment = require('moment');

module.exports = function weatherServiceModule(externalWeatherService) {

    function getWeather(timeWindow, location) {
        
        return externalWeatherService.forecastWeather(location.latitude, location.longitude)
            .then(function(weatherData) { 
                let result = {
                    currentTemperature: weatherData.currently.temperature,
                    hourly: new Array(),
                }

                let hours = weatherData.hourly.data;
                let momentStartTime = new moment(timeWindow.startTime);
                let momentEndTime = new moment(timeWindow.endTime);
                let minTemp = null;
                let maxTemp = null;

                for(let i = 0; i < hours.length; i++) {
                    
                    let hour = hours[i];
                    let momentTime = new moment.unix(hour.time);
                    
                    if (momentTime.isSameOrAfter(momentStartTime) && momentTime.isSameOrBefore(momentEndTime)) {
                        if (minTemp == null || minTemp > hour.temperature) {
                            minTemp = hour.temperature;
                        }
    
                        if (maxTemp == null || maxTemp < hour.temperature) {
                            maxTemp = hour.temperature;
                        }

                        result.hourly.push(
                            {
                                time: momentTime.format("YYYY-MM-DD HH:mm"),
                                isDark: hour.time < weatherData.daily.data[0].sunriseTime || hour.time > weatherData.daily.data[0].sunsetTime,
                                cloudiness: hour.cloudCover * 100,
                                chanceOfRain: hour.precipType == "rain" ? hour.precipProbability * 100 : 0,
                                chanceOfSnow: hour.precipType == "snow" || hour.precipType == "sleet" ? hour.precipProbability * 100 : 0
                            });
                    }
                }

                result.minimumTemperature = minTemp;
                result.maximumTemperature = maxTemp;
        
                return result;
            } );
    }

    let publicApi = {
        getWeather: getWeather
    };

    return publicApi;
};

