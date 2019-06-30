let chai = require('chai');
let sinon = require('sinon');

let Sut = require('../../src/attireAdvisors/feetAdvisor');
let Conditions = require('../../src/conditions');

let expect = chai.expect;


describe('feetAdvisor', function() {

  const notImportant = 0;

  function createConditionsStub(itMightRain, minTemp) {
    return createConditionsStub(itMightRain, minTemp, notImportant);
  }

  function createConditionsStub(itMightRain, minTemp, maxTemp) {
    let conditions = new Conditions();
    sinon.stub(conditions, 'itMightRain').callsFake( function() { return itMightRain; });
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return minTemp; });
    sinon.stub(conditions, 'getMaximumTemperature').callsFake( function() { return maxTemp; });
    return conditions;
  }

  // Shoes
  it('Advises to wear high shoes when max temperature is below high shoes threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, notImportant, sut.highShoesThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear high shoes']);
  });

  it('Advises to wear regular shoes when max temperature is above high shoes threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, notImportant, sut.highShoesThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear regular shoes']);
  });

  // Socks
  it('Advises to wear warm socks when min temperature is below warm socks threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.warmSocksThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear warm socks']);
  });

  it('Advises to wear regular socks when min temperature is above warm socks threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.warmSocksThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear regular socks']);
  });

  // Overshoes
  it('Advises to take overshoes when it might rain', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(true, notImportant);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['take overshoes']);
  });

  it('Advises not to take overshoes when it will not rain', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, notImportant);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).not.to.include.members(['take overshoes']);
  });

  it('Advises to wear overshoes when minimum temp is below overshoes threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(true, sut.overshoesThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear overshoes']);
  });

  it('Advises not to wear overshoes when minimum temp is above overshoes threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(true, sut.overshoesThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).not.to.include.members(['wear overshoes']);
  });

});
