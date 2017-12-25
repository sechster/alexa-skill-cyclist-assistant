const chai = require('chai');
const chaiDateTime = require('chai-datetime');
chai.use(chaiDateTime);
const sinon = require('sinon');
const moment = require('moment');
const config = require('config');

const sut = require('./../../src/services/rideTimeService');

const expect = chai.expect;


describe('RideTimeService', function() {

  const averageSpeed = config.get('rideTime.averageSpeed');

  it('getRideTimeData should return provided dateTime as a start', function() {

    // arrange
    let now = moment().toDate();
    let rideDistance = 0;

    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.startTime).to.equalTime(now);
  });

  it('getRideTimeData should consider 25km/h average speed for first 25 kms (2.4 min / km)', function() {

    // arrange
    let now = moment().toDate();
    let rideDistance = 20;
    let endTime = moment(now).add(48, 'm').toDate();
    
    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.endTime).to.equalTime(endTime);
  });

  it('getRideTimeData should consider 25km/h average speed and 10 minute break after each 25 kms', function() {

    // arrange
    let now = moment().toDate();
    let rideDistance = 76;
    let endTime = moment(now).add(182.4, 'm').add(30, 'm').toDate();

    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.endTime).to.equalTime(endTime);
  });

  it('getRideTimeData should consider 25km/h average speed and 10 minute break after each 25 kms and 30 minutes every 100 km', function() {

    // arrange
    let now = moment().toDate();
    let rideDistance = 203;
    let endTime = moment(now).add(487.2, 'm').add(80, 'm').add(60, 'm').toDate();

    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.endTime).to.equalTime(endTime);
  });
});