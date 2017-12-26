const moment = require('moment');
const apixu = require('./externalServices/apixu');
const airly = require('./externalServices/airly');
const weatherService = require("./services/weatherService")(apixu);
const airConditionService = require("./services/airConditionService")(airly);
const factory = require('./attireBuilderFactory');
const director = require('./attireBuildDirector');

module.exports.getAdvice = function getAdviceModule(rideTime) {
    return weatherService.getWeather(rideTime)
        .then(function(weather) {
            let airCondition = airConditionService.getCurrentAirCondition();
            let conditions = require('./conditions')(weather, airCondition);
            
            if (conditions.itMightSnow())
            {
                return "It might snow. Stay home."
            }
        
            let expert = factory.create(conditions);
            let advice = director.buildAdvice(expert);

            return advice;
        });
}