const chai = require('chai');
const sinon = require('sinon');
const config = require('config');
const Sut = require('./../src/conditions');

const expect = chai.expect;

describe('Conditions', function(){

    it('getCurrentSeason returns summer over a specific minimum temperature threshold', function(){

        // arrange
        let sut = new Sut({ minimumTemperature: config.get('weather.summerMinTemperatureThreshold') + 1 });

        // act
        let result = sut.getCurrentSeason();

        // assert
        expect(result).to.equal("summer");
    });

    it('getCurrentSeason returns spring over a specific minimum temperature threshold, but below summer threshold', function(){

        // arrange
        let sut = new Sut({ minimumTemperature: config.get('weather.springMinTemperatureThreshold') + 1 });

        // act
        let result = sut.getCurrentSeason();

        // assert
        expect(result).to.equal("spring");
    });

    it('getCurrentSeason returns autumn over a specific minimum temperature threshold, but below spring threshold', function(){

        // arrange
        let sut = new Sut({ minimumTemperature: config.get('weather.autumnMinTemperatureThreshold') + 1 });

        // act
        let result = sut.getCurrentSeason();

        // assert
        expect(result).to.equal("autumn");
    });

    it('getCurrentSeason returns winter below all thresholds', function(){

        // arrange
        let sut = new Sut({ minimumTemperature: config.get('weather.autumnMinTemperatureThreshold') - 1 });

        // act
        let result = sut.getCurrentSeason();

        // assert
        expect(result).to.equal("winter");
    });

    it('isCloudy returns true above configured threshold', function(){

        // arrange
        let sut = new Sut({ cloudiness: config.get('weather.isCloudyThreshold') + 1 });

        // act
        let result = sut.isCloudy();

        // assert
        expect(result).to.be.true;
    });

    it('isCloudy returns false below configured threshold', function(){

        // arrange
        let sut = new Sut({ cloudiness: config.get('weather.isCloudyThreshold') - 1 });

        // act
        let result = sut.isCloudy();

        // assert
        expect(result).to.be.false;
    });

    it('isDark returns false if it is not dark', function(){

        // arrange
        let sut = new Sut({ isDark: false });

        // act
        let result = sut.isDark();

        // assert
        expect(result).to.be.false;
    });

    it('isDark returns true if it is dark', function(){

        // arrange
        let sut = new Sut({ isDark: true });

        // act
        let result = sut.isDark();

        // assert
        expect(result).to.be.true;
    });

    it('itMightRain returns true above configured threshold', function(){

        // arrange
        let sut = new Sut({ chanceOfRain: config.get('weather.itMightRainThreshold') + 1 });

        // act
        let result = sut.itMightRain();

        // assert
        expect(result).to.be.true;
    });

    it('itMightRain returns false below configured threshold', function(){

        // arrange
        let sut = new Sut({ chanceOfRain: config.get('weather.itMightRainThreshold') - 1 });

        // act
        let result = sut.itMightRain();

        // assert
        expect(result).to.be.false;
    });

    it('itMightSnow returns true above configured threshold', function(){

        // arrange
        let sut = new Sut({ chanceOfSnow: config.get('weather.itMightSnowThreshold') + 1 });

        // act
        let result = sut.itMightSnow();

        // assert
        expect(result).to.be.true;
    });

    it('itMightSnow returns false below configured threshold', function(){

        // arrange
        let sut = new Sut({ chanceOfSnow: config.get('weather.itMightSnowThreshold') - 1 });

        // act
        let result = sut.itMightSnow();

        // assert
        expect(result).to.be.false;
    });

    it('getMinimumTemperature returns minimum temperature', function(){

        // arrange
        let sut = new Sut({ minimumTemperature: -123 });

        // act
        let result = sut.getMinimumTemperature();

        // assert
        expect(result).to.equal(-123);
    });

    it('getAverageTemperature returns average temperature', function(){

        // arrange
        let sut = new Sut({ averageTemperature: -223 });

        // act
        let result = sut.getAverageTemperature();

        // assert
        expect(result).to.equal(-223);
    });

});
