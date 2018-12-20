const darksky = require('./externalServices/darksky');
const airly = require('./externalServices/airly');
const weatherService = require("./services/weatherService")(darksky);
const airConditionService = require("./services/airConditionService")(airly);
const factory = require('./attireBuilderFactory');
const director = require('./attireBuildDirector');

module.exports.getAttireSet = function getAttireSetModule(rideTime) {
    return weatherService.getWeather(rideTime)
        .then(function(weather) {
            let airCondition = airConditionService.getCurrentAirCondition();
            let conditions = require('./conditions')(weather, airCondition);
            
            if (conditions.itMightSnow())
            {
                return "It might snow! You should stay home!"
            }
        
            let expert = factory.create(conditions);
            let attireSet = director.buildAttireSet(expert);

            return attireSet;
        });
}