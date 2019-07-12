const apixu = require('./../src/externalServices/apixu');
const airly = require('./../src/externalServices/airly');
const cyclingCompanion = require('./../src/cyclingCompanion');
const moment = require('moment');

describe('Integration tests', function(){

    it('forecastWeather', function(){
        //apixu.forecastWeather('wroclaw', 1).then(function(response) {console.log(response.forecast.forecastday[0].day);} );
    });

    it('getMeasurement', function(){
        //airly.getMeasurement(51.087253, 16.911126).then(function(response) {console.log(JSON.stringify(response));} );
    });

    it('cyclingCompanion', function(){
        //cyclingCompanion.getHints(20, {latitude: "51.087253", longitude: "16.911126"}).then(function(hints) {console.log(hints)});
    });

});

