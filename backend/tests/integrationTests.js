const apixu = require('./../src/externalServices/apixu');
const attireAdvisor = require('./../src/attireAdvisor');
const moment = require('moment');

describe('Integration tests', function(){

    it('forecastWeather', function(){
        //apixu.forecastWeather('wroclaw', 1).then(function(response) {console.log(response.forecast.forecastday[0].day);} );
    });

    it('attireAdvisor', function(){
        //attireAdvisor.getAdvice({ startTime: moment().date(), endTime: moment().add(3, 'h').date() }).then(function(advice) {console.log(advice)});
    });

});

