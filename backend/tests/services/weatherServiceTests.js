let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;

let sinon = require('sinon');
let darksky = require('./../../src/externalServices/darksky');

let exampleDarkSkyForecastResponse = require('./exampleResponseFromDarkSky.json');

let Sut = require('./../../src/services/weatherService');

describe('WeatherService', function(){

    sinon.stub(darksky, 'forecastWeather').callsFake(function() {
        return new Promise((resolve, reject) => { return resolve(exampleDarkSkyForecastResponse) });
    });

    it('Getting weather for the next 2 hours', function(){

        // arrange
        let startTime = new Date(2018, 11, 21, 14, 0, 0, 0);
        let endTime = new Date(2018, 11, 21, 16, 0, 0, 0);

        let location = {
            latitude: "1",
            longitude: "2"
        };

        let sut = new Sut(darksky);

        // act
        let result = sut.getWeather({ startTime: startTime, endTime: endTime }, location);

        // assert
        expect(result).to.eventually.deep.equal({
            'minimumTemperature': 4.38,
            'maximumTemperature': 5.22,
            'currentTemperature': 1.11,
            'hourly' : [
                {
                    'time': "2018-12-21 14:00",
                    'isDark': false,
                    'cloudiness': 99,
                    'chanceOfRain': 12,
                    'chanceOfSnow': 0
                },
                {
                    'time': "2018-12-21 15:00",
                    'isDark': false,
                    'cloudiness': 100,
                    'chanceOfRain': 20,
                    'chanceOfSnow': 0
                },
                {
                    'time': "2018-12-21 16:00",
                    'isDark': true,
                    'cloudiness': 100,
                    'chanceOfRain': 30,
                    'chanceOfSnow': 0
                },
            ]
         });
    });

    it('Getting weather for less than an hour', function(){

        // arrange
        let startTime = new Date(2018, 11, 21, 14, 0, 0, 0);
        let endTime = new Date(2018, 11, 21, 14, 24, 0, 0);

        let location = {
            latitude: "1",
            longitude: "2"
        };

        let sut = new Sut(darksky);

        // act
        let result = sut.getWeather({ startTime: startTime, endTime: endTime }, location);

        // assert
        expect(result).to.eventually.deep.equal({
            'minimumTemperature': 5.22,
            'maximumTemperature': 5.22,
            'currentTemperature': 1.11,
            'hourly' : [
                {
                    'time': "2018-12-21 14:00",
                    'isDark': false,
                    'cloudiness': 99,
                    'chanceOfRain': 12,
                    'chanceOfSnow': 0
                }
            ]
         });
    });

});

