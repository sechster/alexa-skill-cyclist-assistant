const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const sinon = require('sinon');
const airly = require('./../../src/externalServices/airly');

const exampleAirlyMeasurementResponse = require('./exampleResponseFromAirly.json');

const Sut = require('./../../src/services/airConditionService');

describe('AirConditionService', function(){

    it('getCurrentAirCondition', function(){

        // arrange
        sinon.stub(airly, 'getMeasurement').callsFake(function() {
            return new Promise((resolve, reject) => { return resolve(exampleAirlyMeasurementResponse) });
        });

        let sut = new Sut(airly);

        // act & assert
        expect(sut.getCurrentAirCondition()).to.eventually.deep.equal({
            'caqiLevel': 85.44,
         });
    });
});

