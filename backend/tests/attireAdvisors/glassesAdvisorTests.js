let chai = require('chai');
let sinon = require('sinon');

let Sut = require('../../src/attireAdvisors/glassesAdvisor');
let Conditions = require('../../src/conditions');

let expect = chai.expect;


describe('glassesAdvisor', function() {

  const notImportant = 100;

  function createConditionsStub(isDark, isCloudy, minTemp) {
    let conditions = new Conditions();
    sinon.stub(conditions, 'isDark').callsFake( function() { return isDark; });
    sinon.stub(conditions, 'isCloudy').callsFake( function() { return isCloudy; });
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return minTemp; });
    return conditions;
  }

  // Goggles
  it('Advises to wear goggles when min temperature is below goggles threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, false, sut.gogglesThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear goggles']);
  });

  it('Advises not to wear goggles when min temperature is above goggles threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, false, sut.gogglesThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).not.to.include.members(['wear goggles']);
  });

  // Glasses
  it('Advises to wear transparent glasses if it is dark', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(true, false, notImportant);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear transparent glasses']);
  });

  it('Advises to wear sunglasses level two if it is cloudy', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, true, notImportant);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear sunglasses level two']);
  });

  it('Advises to wear sunglasses level three in any other case', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, false, notImportant);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear sunglasses level three']);
  });

});
