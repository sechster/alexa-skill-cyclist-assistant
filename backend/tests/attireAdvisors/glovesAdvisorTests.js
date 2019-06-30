let chai = require('chai');
let sinon = require('sinon');

let Sut = require('../../src/attireAdvisors/glovesAdvisor');
let Conditions = require('../../src/conditions');

let expect = chai.expect;


describe('glovesAdvisor', function() {

  it('Advises to wear winter gloves when min temperature is below winter gloves threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = new Conditions();
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return sut.winterGlovesThreshold - 1; });

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear winter gloves']);
  });

  it('Advises to wear autumn gloves when min temperature is below autumn gloves threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = new Conditions();
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return sut.autumnGlovesThreshold - 1; });

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear autumn gloves']);
  });

  it('Advises to wear short gloves in any other case', function() {

    // arrange
    let sut = new Sut();
    let conditions = new Conditions();
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return sut.autumnGlovesThreshold + 1; });

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear short gloves']);
  });

});
