const chai = require('chai');
const sinon = require('sinon');
const config = require('config');
const Sut = require('../src/masterAdvisor');
let Conditions = require('../src/conditions');

const expect = chai.expect;

describe('masterAdvisor', function(){

    it('Integration test', function(){

        // arrange
        let sut = new Sut();
        let conditions = new Conditions();
        sinon.stub(conditions, 'itMightRain').callsFake( function() { return true; });
        sinon.stub(conditions, 'itMightSnow').callsFake( function() { return true; });
        sinon.stub(conditions, 'isCloudy').callsFake( function() { return true; });
        sinon.stub(conditions, 'isDark').callsFake( function() { return true; });
        sinon.stub(conditions, 'isSmoggy').callsFake( function() { return true; });
        sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return -10; });
        sinon.stub(conditions, 'getCurrentTemperature').callsFake( function() { return 0; });
        sinon.stub(conditions, 'getMaximumTemperature').callsFake( function() { return 100; });

        // act
        let result = sut.advise(conditions);

        // assert
        expect(result).to.not.be.empty;
    });

});
