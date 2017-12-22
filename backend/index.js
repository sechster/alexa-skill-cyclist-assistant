exports.handler = (event, context, callback) => {

    // check temperature
    // check precipitation
    // check wind
    // check smog
    // https://www.apixu.com



    // czapka z daszkiem na slonce / buff / kominiarka / nic
    // maska przeciwsmogowa / nic
    // koszulka krotka / dluga / kurtka
    // rekawiczki krotkie / rekawiczki dlugie / rekawiczki jesienne / rekawiczki zimowe
    // spodnie krotkie / spodnie dlugie
    // skarpety cienkie / skarpety dlugie
    // buty niskie / buty wysokie

    // zabrac rekawki
    // zabrac nogawki
    
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