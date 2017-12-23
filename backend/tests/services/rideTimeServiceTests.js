let chai = require('chai');
let chaiDateTime = require('chai-datetime');
chai.use(chaiDateTime);
let sinon = require('sinon');
let moment = require('moment');

let Sut = require('./../../src/services/rideTimeService');

let expect = chai.expect;


describe('RideTimeService', function() {

  const averageSpeed = 25;

  it('getRideTimeData should return provided dateTime as a start', function() {

    // arrange
    let sut = new Sut();
    let now = moment().toDate();
    let rideDistance = 0;

    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.startTime).to.equalTime(now);
  });

  it('getRideTimeData should consider 25km/h average speed for first 25 kms (2.4 min / km)', function() {

    // arrange
    let sut = new Sut();
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
    let sut = new Sut();
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
    let sut = new Sut();
    let now = moment().toDate();
    let rideDistance = 203;
    let endTime = moment(now).add(487.2, 'm').add(80, 'm').add(60, 'm').toDate();

    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.endTime).to.equalTime(endTime);
  });

  it('calculateDuration should return 10,45 (10:27) on a 203km ride', function() {

    // arrange
    let sut = new Sut();
    let now = moment().toDate();
    let rideDistance = 203;
    let endTime = moment(now).add(487.2, 'm').add(80, 'm').add(60, 'm').toDate();

    // act
    let result = sut.getRideTimeData(now, rideDistance);

    // assert
    expect(result.calculateDuration()).to.equal(10.45);
  });
});