const config = require('config');

module.exports = function conditionsModule(weather, airCondition) {

    function isCloudy() {
        return (weather.hourly.some(x => x.cloudiness > config.get('weather.isCloudyThreshold')));
    }

    function isDark() {
        return weather.hourly.some(x => x.isDark === true);
    }

    function isSmoggy() {
        return airCondition.caqiLevel > 50;
    }

    function itMightRain() {
        return (weather.hourly.some(x => x.chanceOfRain > config.get('weather.itMightRainThreshold')));
    }

    function itMightSnow() {
        return (weather.hourly.some(x => x.chanceOfSnow > config.get('weather.itMightSnowThreshold')));
    }

    function getMinimumTemperature() {
        return weather.minimumTemperature;
    }

    function getMaximumTemperature() {
        return weather.maximumTemperature;
    }

    function getCurrentTemperature() {
        return weather.currentTemperature;
    }

    let publicApi = {
        isCloudy: isCloudy,
        isDark: isDark,
        isSmoggy: isSmoggy,
        itMightRain: itMightRain,
        itMightSnow: itMightSnow,
        getMinimumTemperature: getMinimumTemperature,
        getMaximumTemperature: getMaximumTemperature,
        getCurrentTemperature: getCurrentTemperature,
    }

    return publicApi;
}