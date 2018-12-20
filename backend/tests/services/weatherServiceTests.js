let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;

let sinon = require('sinon');
let darksky = require('./../../src/externalServices/darksky');

let exampleDarkSkyForecastResponse = require('./exampleResponseFromDarkSky.json');

let Sut = require('./../../src/services/weatherService');

describe('WeatherService', function(){

    it('getWeatherForNextHours', function(){

        // arrange
        sinon.stub(darksky, 'forecastWeather').callsFake(function() {
            return new Promise((resolve, reject) => { return resolve(exampleDarkSkyForecastResponse) });
        });
        let startTime = new Date(2018, 11, 20, 16, 0, 0, 0);
        let endTime = new Date(2018, 11, 20, 17, 0, 0, 0);

        let sut = new Sut(darksky);

        // act & assert
        expect(sut.getWeather({ startTime: startTime, endTime: endTime })).to.eventually.deep.equal({
            'minimumTemperature': 1.17,
            'maximumTemperature': 2.01,
            'averageTemperature': 1.5899999999999999,
            'hourly' : [
                {
                    'time': "2018-12-20 16:00",
                    'temperature': 1.15,
                    'isDark': true,
                    'cloudiness': 79,
                    'chanceOfRain': 0,
                    'chanceOfSnow': 22
                },
                {
                    'time': "2018-12-20 17:00",
                    'temperature': 1.07,
                    'isDark': true,
                    'cloudiness': 88,
                    'chanceOfRain': 0,
                    'chanceOfSnow': 20
                },
            ]
         });
    });
});

