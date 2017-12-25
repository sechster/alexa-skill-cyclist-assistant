const config = require('config');

module.exports = function conditionsModule(weather, airCondition) {

    this.weather = weather;
    this.airCondition = airCondition;

    function getCurrentSeason() {
        if (weather.minimumTemperature > config.get('weather.summerMinTemperatureThreshold')) {
            return "summer";
        }

        if (weather.minimumTemperature > config.get('weather.springMinTemperatureThreshold')) {
            return "spring";
        }

        if (weather.minimumTemperature > config.get('weather.autumnMinTemperatureThreshold')) {
            return "autumn";
        }

        return "winter";
    }

    function isCloudy() {
        return (weather.cloudiness > config.get('weather.isCloudyThreshold'));
    }

    function isDark() {
        return weather.isDark;
    }

    function isSmoggy() {
        return false;
    }

    function itMightRain() {
        return (weather.chanceOfRain > config.get('weather.itMightRainThreshold'));
    }

    function itMightSnow() {
        return (weather.chanceOfSnow > config.get('weather.itMightSnowThreshold'));
    }

    function getMinimumTemperature() {
        return weather.minimumTemperature;
    }

    function getAverageTemperature() {
        return weather.averageTemperature;
    }

    let publicApi = {
        getCurrentSeason: getCurrentSeason,
        isCloudy: isCloudy,
        isDark: isDark,
        isSmoggy: isSmoggy,
        itMightRain: itMightRain,
        itMightSnow: itMightSnow,
        getMinimumTemperature: getMinimumTemperature,
        getAverageTemperature: getAverageTemperature,
    }

    return publicApi;
}