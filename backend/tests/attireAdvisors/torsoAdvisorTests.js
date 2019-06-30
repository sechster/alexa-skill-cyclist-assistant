let chai = require('chai');
let sinon = require('sinon');

let Sut = require('../../src/attireAdvisors/torsoAdvisor');
let Conditions = require('../../src/conditions');

let expect = chai.expect;


describe('torsoAdvisor', function() {

  const notImportant = 0;

  function createConditionsStub(itMightRain, minTemp) {
    return createConditionsStub(itMightRain, minTemp, notImportant, notImportant);
  }

  function createConditionsStub(itMightRain, minTemp, currentTemp, maxTemp) {
    let conditions = new Conditions();
    sinon.stub(conditions, 'itMightRain').callsFake( function() { return itMightRain; });
    sinon.stub(conditions, 'getMinimumTemperature').callsFake( function() { return minTemp; });
    sinon.stub(conditions, 'getCurrentTemperature').callsFake( function() { return currentTemp; });
    sinon.stub(conditions, 'getMaximumTemperature').callsFake( function() { return maxTemp; });
    return conditions;
  }

  // Rain Jacket
  it('Advises to take rain jacket if it might rain and minimum temp might be quite low', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(true, sut.rainJacketThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['take rain jacket']);
  });

  it('Advises not to take rain jacket if it might rain and minimum temp should be quite high', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(true, sut.rainJacketThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.not.include.members(['take rain jacket']);
  });

  it('Advises not to take rain jacket if it will not rain regardless of temp going below threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.rainJacketThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.not.include.members(['take rain jacket']);
  });

  // Thin Jacket
  it('Advises to wear thin jacket if minimum temp is below thin jacket threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.thinJacketThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear thin jacket']);
  });

  it('Advises to take thin jacket if minimum temp is below thin jacket threshold but it is warmer now', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.thinJacketThreshold - 1, sut.thinJacketThreshold + 1, notImportant);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['take thin jacket']);
  });

  it('Advises not to take nor wear thin jacket if minimum temp is above thin jacket threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.thinJacketThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).not.to.include.members(['take thin jacket', 'wear thin jacket']);
  });

  // Shirt
  it('Advises to wear long sleeve shirt if maximum temp is below long sleeve threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, notImportant, notImportant, sut.longSleeveThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear long sleeve shirt']);
  });

  it('Advises to wear short sleeve shirt if maximum temp is above long sleeve threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, notImportant, notImportant, sut.longSleeveThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear short sleeve shirt']);
  });

  // Cycling jacket
  it('Advises to wear cycling jacket if maximum temp is below long sleeve threshold and minimum temp is below cycling jacket threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.cyclingJacketThreshold - 1, notImportant, sut.longSleeveThreshold - 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(['wear long sleeve shirt', 'wear cycling jacket']);
  });

  it('Advises not to wear cycling jacket if maximum temp is below long sleeve threshold and minimum temp is not below cycling jacket threshold', function() {

      // arrange
      let sut = new Sut();
      let conditions = createConditionsStub(false, sut.cyclingJacketThreshold + 1, notImportant, sut.longSleeveThreshold - 1);
  
      // act
      let result = sut.advise(conditions);
  
      // assert
      expect(result).not.to.include.members(['wear cycling jacket']);
  });

  it('Advises not to wear cycling jacket if maximum temp is above long sleeve threshold and minimum temp is below cycling jacket threshold', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.cyclingJacketThreshold - 1, notImportant, sut.longSleeveThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).not.to.include.members(['wear cycling jacket']);
  });

  // Arm warmers
  it('Advises to wear arm warmers when max temp is above long sleeve threshold and min temp is below long sleeve threshold and it will get warmer', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.longSleeveThreshold - 1, sut.longSleeveThreshold - 1, sut.longSleeveThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear short sleeve shirt', 'wear arm warmers']);
  });

  it('Advises to take arm warmers when max temp is above long sleeve threshold and min temp is below long sleeve threshold and it will colder', function() {

    // arrange
    let sut = new Sut();
    let conditions = createConditionsStub(false, sut.longSleeveThreshold - 1, sut.longSleeveThreshold + 1, sut.longSleeveThreshold + 1);

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.have.members(['wear short sleeve shirt', 'take arm warmers']);
  });
});

//rekawki                                    xxxxx
//kurtka cienka                          xxxx
//kurtka gruba              xxxxxxxxxxxxx
//krotki rekawek                                xxxxxxxxx
//dlugi rekawek             xxxxxxxxxxxxxxxxxxxx
    //                      |---|---|---|---|---|---|---|
    //                     -10  -5  0   5   10  15  20  25