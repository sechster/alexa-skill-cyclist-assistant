let chai = require('chai');
let sinon = require('sinon');

let Sut = require('../../src/attireAdvisors/legAdvisor');
let Conditions = require('../../src/conditions');

let expect = chai.expect;


describe('legAdvisor', function() {

  const notImportant = 0;

  function createConditionsStub(minTemp, currentTemp, maxTemp) {
    let conditions = new Conditions();
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return minTemp; });
    sinon.stub(conditions, 'getCurrentTemperature').callsFake( function() { return currentTemp; });
    sinon.stub(conditions, 'getMaximumTemperature').callsFake( function() { return maxTemp; });
    return conditions;
  }

  // Pants
  it('Advises to wear long pants when max temp is below long pant threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(notImportant, notImportant, sut.longPantsThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear long pants']);
  });

  it('Advises to wear short pants when max temp is above long pant threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(notImportant, notImportant, sut.longPantsThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear short pants']);
  });

  // Leg warmers
  it('Advises to wear leg warmers when max temp is above long pant threshold but min temp is below long pants threshold and it will get warmer', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(sut.longPantsThreshold - 1, sut.longPantsThreshold - 1, sut.longPantsThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear short pants', 'wear leg warmers']);
  });

  it('Advises to take leg warmers when max temp is above long pant threshold but min temp is below long pants threshold and it will get colder', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(sut.longPantsThreshold - 1, sut.longPantsThreshold + 1, sut.longPantsThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear short pants', 'take leg warmers']);
  });
});