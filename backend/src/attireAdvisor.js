const moment = require('moment');
const apixu = require('./externalServices/apixu');
const weatherService = require("./services/weatherService")(apixu);
//const airConditionService = require("./airConditionService");
const rideTimeService = require("./services/rideTimeService");
const factory = require('./attireBuilderFactory');
const director = require('./attireBuildDirector');

module.exports.getAdvice = function getAdviceModule() {

    let rideTime = rideTimeService.getRideTimeData(moment().toDate());
    let weather = weatherService.getWeather(rideTime);
    let airCondition = null; //airConditionService.getCurrentAirCondition();
    let conditions = require('./conditions')(weather, airCondition);

    if (conditions.itMightSnow())
    {
        return "It might snow. Stay home."
    }

    let expert = factory.create(conditions);
    let advice = director.buildAdvice(expert);

    return advice;
}