exports.handler = (event, context, callback) => {

    // https://www.apixu.com
    
    let weatherService = require("./weatherService");
    let airConditionService = require("./airConditionService");
    let factory = require('./clothingExpertFactory');

    let weather = weatherService.getWeatherForNextHours(hours);
    let airCondition = airConditionService.getCurrentAirCondition();
    let rideTime;

    let conditions = { weather: weather, airCondition: airCondition, rideTime: rideTime };

    let expert = factory.create(conditions);

    let advice = expert.getAdvice();




    callback();
};