let moment = require('moment');

module.exports = function attireAdvisorModule() {
    
    function getAdvice() {
        
        let weatherService = require("./services/weatherService");
        let airConditionService = require("./airConditionService");
        let rideTimeService = require("./services/rideTimeService");
        let factory = require('./attireBuilderFactory');

        let rideTime = rideTimeService.getRideTimeData(moment().toDate());
        let weather = weatherService.getWeatherForNextHours(rideTime.calculateDuration());
        let airCondition = airConditionService.getCurrentAirCondition();
        let conditions = require('./conditions')(weather, airCondition);
        let expert = factory.create(conditions);

        let advice = expert.buildAdvice();
    }
    
    let publicApi = {
        getAdvice: getAdvice
    }

    return publicApi;
}