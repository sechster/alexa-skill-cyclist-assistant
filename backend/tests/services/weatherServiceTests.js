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

        let location = {
            latitude: "1",
            longitude: "2"
        };

        let sut = new Sut(darksky);

        // act & assert
        expect(sut.getWeather({ startTime: startTime, endTime: endTime }, location)).to.eventually.deep.equal({
            'minimumTemperature': 1.17,
            'currentTemperature': 1.11,
            'hourly' : [
                {
                    'time': "2018-12-20 16:00",
                    'isDark': true,
                    'cloudiness': 79,
                    'chanceOfRain': 0,
                    'chanceOfSnow': 22
                },
                {
                    'time': "2018-12-20 17:00",
                    'isDark': true,
                    'cloudiness': 88,
                    'chanceOfRain': 0,
                    'chanceOfSnow': 20
                },
            ]
         });
    });
});

