const darksky = require('./externalServices/darksky');
const airly = require('./externalServices/airly');
const weatherService = require("./services/weatherService")(darksky);
const airConditionService = require("./services/airConditionService")(airly);
const masterAdvisor = require('./masterAdvisor');
const rideTimeService = require("./services/rideTimeService");
const moment = require('moment');

module.exports.getHints = function getHintsModule(tripLength, location) {

    let rideTime = rideTimeService.getRideTimeData((new moment()).toDate(), tripLength);
    
    return weatherService.getWeather(rideTime, location)
        .then(function(weather) {
            return airConditionService.getCurrentAirCondition(location)
            .then(function(airCondition) {
                let conditions = require('./conditions')(weather, airCondition);
                
                let result = {
                    rideTime: rideTime,
                    itMightSnow: conditions.itMightSnow(),
                    attireSet: masterAdvisor().advise(conditions)
                };
                
                return result;
            });
        });
}