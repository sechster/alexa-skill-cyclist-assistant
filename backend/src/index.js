exports.handler = (event, context, callback) => {

    // https://www.apixu.com

    let moment = require('moment');
    
    let weatherService = require("./services/weatherService");
    let airConditionService = require("./airConditionService");
    let rideTimeService = require("./services/rideTimeService");
    let factory = require('./attireBuilderFactory');

    let weather = weatherService.getWeatherForNextHours(hours);
    let airCondition = airConditionService.getCurrentAirCondition();
    let rideTime = rideTimeService.getRideTimeData(moment().toDate());

    let conditions = { weather: weather, airCondition: airCondition, rideTime: rideTime };

    let expert = factory.create(conditions);

    let advice = expert.getAdvice();

    callback();
};