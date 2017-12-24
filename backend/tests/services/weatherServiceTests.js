let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;

let sinon = require('sinon');
let apixu = require('./../../src/externalServices/apixu');

let exampleApixuForecastResponse = require('./exampleResponseFromApixu.json');

let Sut = require('./../../src/services/weatherService');

describe('WeatherService', function(){

    it('getWeatherForNextHours', function(){

        // arrange
        sinon.stub(apixu, 'forecastWeather').callsFake(function() {
            return new Promise((resolve, reject) => { return resolve(exampleApixuForecastResponse) });
        });
        let startTime = new Date(2017, 11, 24, 15, 0, 0, 0);
        let endTime = new Date(2017, 11, 24, 16, 0, 0, 0);

        let sut = new Sut(apixu);

        // act & assert
        expect(sut.getWeather({ startTime: startTime, endTime: endTime })).to.eventually.deep.equal({
            'minimumTemperature': 6.7,
            'maximumTemperature': 9.7,
            'averageTemperature': 9.3,
            'totalPrecipitation': 0.5,
            'maximumWindSpeed': 34.9,
            'hourly' : [
                {
                    'time': "2017-12-24 15:00",
                    'temperature': 9.5,
                    'isDark': false,
                    'windSpeed': 28.8,
                    'precipitation': 0.1,
                    'cloudiness': 91,
                    'feltTemperature': 6.0,
                    'chanceOfRain': "40",
                    'chanceOfSnow': "0"
                },
                {
                    'time': "2017-12-24 16:00",
                    'temperature': 9.4,
                    'isDark': true,
                    'windSpeed': 27.4,
                    'precipitation': 0.1,
                    'cloudiness': 86,
                    'feltTemperature': 6.0,
                    'chanceOfRain': "60",
                    'chanceOfSnow': "0"
                },
            ]
         });
    });
});

