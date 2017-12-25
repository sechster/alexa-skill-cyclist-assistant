const moment = require('moment');
const config = require('config');

module.exports = function weatherServiceModule(externalWeatherService) {

    function getWeather(timeWindow) {
        let currentCity = config.get('weather.currentCity');
        const daysOfForecast = 1;
        return externalWeatherService.forecastWeather(currentCity, daysOfForecast)
            .then(function(weatherData) { 
                let result = {
                    minimumTemperature: weatherData.forecast.forecastday[0].day.mintemp_c,
                    maximumTemperature: weatherData.forecast.forecastday[0].day.maxtemp_c,
                    averageTemperature: weatherData.forecast.forecastday[0].day.avgtemp_c,
                    totalPrecipitation: weatherData.forecast.forecastday[0].day.totalprecip_mm,
                    maximumWindSpeed: weatherData.forecast.forecastday[0].day.maxwind_kph,
                    hourly: new Array()
                }

                let hours = weatherData.forecast.forecastday[0].hour;
                let momentStartTime = moment(timeWindow.startTime);
                let momentEndTime = moment(timeWindow.endTime);

                for(let i = 0; i < hours.length; i++) {
                    let hour = hours[i];
                    let momentTime = new moment(hour.time);

                    if (momentTime.isSameOrAfter(momentStartTime) && momentTime.isSameOrBefore(momentEndTime)) {
                        result.hourly.push(
                            {
                                time: hour.time,
                                temperature: hour.temp_c,
                                isDark: hour.is_day === 0 ? true : false,
                                windSpeed: hour.wind_kph,
                                precipitation: hour.precip_mm,
                                cloudiness: hour.cloud,
                                feltTemperature: hour.feelslike_c,
                                chanceOfRain: hour.chance_of_rain,
                                chanceOfSnow: hour.chance_of_snow
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

