const darksky = require('./externalServices/darksky');
const airly = require('./externalServices/airly');
const weatherService = require("./services/weatherService")(darksky);
const airConditionService = require("./services/airConditionService")(airly);
const masterAdvisor = require('./masterAdvisor');
const rideTimeService = require("./services/rideTimeService");
const moment = require('moment');

module.exports.getHints = function getHintsModule(tripLength) {

    let rideTime = rideTimeService.getRideTimeData(moment().toDate(), tripLength);

    return weatherService.getWeather(rideTime)
        .then(function(weather) {
            return airConditionService.getCurrentAirCondition()
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