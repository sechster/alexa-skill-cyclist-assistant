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

  it('getRideTimeData should consider ' + averageSpeed + ' average speed for first ' + averageSpeed + ' kms', function() {

    // arrange
    let now = moment().toDate();
    let rideDistance = 20.0;
    let endTime = 
      moment(now)
        .add(rideDistance / averageSpeed * 60, 'm')
        .toDate();
    
    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.endTime).to.equalTime(endTime);
  });

  it('getRideTimeData should consider ' + averageSpeed + 'km/h average speed and 10 minute break after each ' + averageSpeed + ' kms', function() {

    // arrange
    let now = moment().toDate();
    let rideDistance = 76;
    let endTime = 
      moment(now)
        .add(rideDistance / averageSpeed * 60, 'm')
        .add(Math.floor(rideDistance / averageSpeed) * 10, 'm')
        .toDate();

    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.endTime).to.equalTime(endTime);
  });

  it('getRideTimeData should consider ' + averageSpeed + 'km/h average speed and 10 minute break after each ' + averageSpeed + ' kms and 30 minutes every 100 km', function() {

    // arrange
    let now = moment().toDate();
    let rideDistance = 203.0;
    let endTime = 
      moment(now)
        .add(rideDistance / averageSpeed * 60, 'm')
        .add(Math.floor(rideDistance / averageSpeed) * 10, 'm')
        .add(Math.floor(rideDistance / 100) * 30, 'm')
        .toDate();

    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.endTime).to.equalTime(endTime);
  });
});