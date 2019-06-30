let chai = require('chai');
let sinon = require('sinon');

let Sut = require('../../src/attireAdvisors/headGearAdvisor');
let Conditions = require('../../src/conditions');

let expect = chai.expect;


describe('headGearAdvisor', function() {

  it('Advises to wear balaclava when min temperature is below balaclava threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = new Conditions();
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return sut.balaclavaThreshold - 1; });

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear balaclava']);
  });

  it('Advises to wear winter cap when min temperature is below winter cap threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = new Conditions();
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return sut.winterCapThreshold - 1; });

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear winter cap']);
  });

  it('Advises to wear cycling cap if it is not cold and it is not cloudy', function() {

    // arrange
    let sut = new Sut();
    let conditions = new Conditions();
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return sut.winterCapThreshold + 1; });
    sinon.stub(conditions, 'isCloudy').callsFake( function() { return false; });

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear cycling cap']);
  });

});
