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

    it('isDark returns false if it is not dark for the entire ride', function(){

        // arrange
        let sut = new Sut({ hourly: [ {isDark: false}, {isDark: false} ] });

        // act
        let result = sut.isDark();

        // assert
        expect(result).to.be.false;
    });

    it('isDark returns true if it is dark at any moment of the ride', function(){

        // arrange
        let sut = new Sut({ hourly: [ {isDark: false}, {isDark: true} ] });

        // act
        let result = sut.isDark();

        // assert
        expect(result).to.be.true;
    });

    it('itMightRain returns true if any hour is above configured threshold', function(){

        // arrange
        let chance = config.get('weather.itMightRainThreshold') - 1;
        let sut = new Sut({ hourly: [ {chanceOfRain: chance}, {chanceOfRain: chance + 2}, {chanceOfRain: chance} ] });

        // act
        let result = sut.itMightRain();

        // assert
        expect(result).to.be.true;
    });

    it('itMightRain returns false if every hour is below configured threshold', function(){

        // arrange
        let chance = config.get('weather.itMightRainThreshold') - 1;
        let sut = new Sut({ hourly: [ {chanceOfRain: chance}, {chanceOfRain: chance}, {chanceOfRain: chance} ] });

        // act
        let result = sut.itMightRain();

        // assert
        expect(result).to.be.false;
    });

    it('itMightSnow returns true if any hour is above configured threshold', function(){

        // arrange
        let chance = config.get('weather.itMightSnowThreshold') - 1;
        let sut = new Sut({ hourly: [ {chanceOfSnow: chance}, {chanceOfSnow: chance + 2}, {chanceOfSnow: chance} ] });

        // act
        let result = sut.itMightSnow();

        // assert
        expect(result).to.be.true;
    });

    it('itMightSnow returns false if every hour is below configured threshold', function(){

        // arrange
        let chance = config.get('weather.itMightSnowThreshold') - 1;
        let sut = new Sut({ hourly: [ {chanceOfSnow: chance}, {chanceOfSnow: chance}, {chanceOfSnow: chance} ] });

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

    it('isSmoggy returns true if CAQI is greater than 90', function(){

        // arrange
        let sut = new Sut({}, { caqiLevel: 91 });

        // act
        let result = sut.isSmoggy();

        // assert
        expect(result).to.be.true;
    });

    it('isSmoggy returns false if CAQI is less than 90', function(){

        // arrange
        let sut = new Sut({}, { caqiLevel: 89 });

        // act
        let result = sut.isSmoggy();

        // assert
        expect(result).to.be.false;
    });

});
