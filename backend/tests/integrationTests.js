const apixu = require('./../src/externalServices/apixu');
const attireAdvisor = require('./../src/attireAdvisor');

describe('Integration tests', function(){

    it('forecastWeather', function(){
        //apixu.forecastWeather('wroclaw', 1).then(function(response) {console.log(response.forecast.forecastday[0].day);} );
    });

    it('attireAdvisor', function(){
        //console.log(attireAdvisor.getAdvice());
    });

});

