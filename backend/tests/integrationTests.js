const apixu = require('./../src/externalServices/apixu');
const airly = require('./../src/externalServices/airly');
const attireAdvisor = require('./../src/attireAdvisor');
const moment = require('moment');

describe('Integration tests', function(){

    it('forecastWeather', function(){
        //apixu.forecastWeather('wroclaw', 1).then(function(response) {console.log(response.forecast.forecastday[0].day);} );
    });

    it('getMeasurement', function(){
        //airly.getMeasurement(51.087253, 16.911126).then(function(response) {console.log(JSON.stringify(response));} );
    });

    it('attireAdvisor', function(){
        //attireAdvisor.getAdvice({ startTime: moment().toDate(), endTime: moment().add(3, 'h').toDate() }).then(function(advice) {console.log(advice)});
    });

});

