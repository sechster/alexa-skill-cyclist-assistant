let chai = require('chai');
let sinon = require('sinon');

let Sut = require('./../../src/attireBuilders/springAttireBuilder');
let Conditions = require('./../../src/conditions');

let expect = chai.expect;


describe('SpringAttireBuilder', function() {

  it('adviseHeadGear_advises_cycling_cap', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseHeadGear();

    // assert
    expect(result).to.equal("cycling cap");
  });

  it('adviseSmogMask_advises_mask_if_it_is_smoggy', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, 'isSmoggy').callsFake( function() { return true; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseSmogMask();

    // assert
    expect(result).to.equal("smog mask");
  });


  it('adviseSmogMask_advises_no_mask_if_it_is_not_smoggy', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, 'isSmoggy').callsFake( function() { return false; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseSmogMask();

    // assert
    expect(result).to.equal("");
  });

  it('adviseShirt_advises_short_sleeve_shirt_if_average_temperature_is_not_below_17_degrees', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getAverageTemperature").callsFake(function() { return 17 });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseShirt();

    // assert
    expect(result).to.equal("short sleeve shirt");
  });

  it('adviseShirt_advises_long_sleeve_shirt_if_average_temperature_is_below_17_degrees', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getAverageTemperature").callsFake(function() { return 16 });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseShirt();

    // assert
    expect(result).to.equal("long sleeve shirt");
  });

  it('adviseGloves_advises_short_gloves', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseGloves();

    // assert
    expect(result).to.equal("short gloves");
  });

  it('advisePants_advises_short_pants', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.advisePants();

    // assert
    expect(result).to.equal("short pants");
  });

  it('adviseSocks_advises_regular_socks', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseSocks();

    // assert
    expect(result).to.equal("regular socks");
  });

  it('adviseShoes_advises_low_shoes', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseShoes();

    // assert
    expect(result).to.equal("low shoes");
  });

  it('adviseArmWarmers_advises_to_take_arm_warmers_if_minimum_temperature_might_fall_below_17_degrees_and_average_is_above', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 16; });
    sinon.stub(conditions, "getAverageTemperature").callsFake(function() { return 17; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseArmWarmers();

    // assert
    expect(result).to.equal("take arm warmers");
  });

  it('adviseArmWarmers_advises_not_to_take_arm_warmers_if_minimum_temperature_will_not_fall_below_17_degrees_and_average_is_above', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 17; });
    sinon.stub(conditions, "getAverageTemperature").callsFake(function() { return 17; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseArmWarmers();

    // assert
    expect(result).to.equal("");
  });

  it('adviseArmWarmers_advises_not_to_take_arm_warmers_if_minimum_temperature_will_fall_below_17_degrees_but_the_average_is_below', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 16; });
    sinon.stub(conditions, "getAverageTemperature").callsFake(function() { return 16; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseArmWarmers();

    // assert
    expect(result).to.equal("");
  });

  it('adviseLegWarmers_advises_to_take_leg_warmers_if_minimum_temperature_might_fall_below_10_degrees', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 9; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseLegWarmers();

    // assert
    expect(result).to.equal("take leg warmers");
  });

  it('adviseLegWarmers_advises_not_to_take_leg_warmers_if_minimum_temperature_will_not_fall_below_10_degrees', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 10; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseLegWarmers();

    // assert
    expect(result).to.equal("");
  });

  it('adviseRainJacket_advises_to_take_rain_jacket_if_it_might_rain', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "itMightRain").callsFake(function() { return true; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseRainJacket();

    // assert
    expect(result).to.equal("take rain jacket");
  });

  it('adviseRainJacket_advises_not_to_take_rain_jacket_if_it_will_not_rain', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "itMightRain").callsFake(function() { return false; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseRainJacket();

    // assert
    expect(result).to.equal("");
  });

  it('adviseGlasses_advises_to_wear_sunglasses_level_three_if_it_is_not_cloudy_and_it_is_not_dark', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "isDark").callsFake(function() { return false; });
    sinon.stub(conditions, "isCloudy").callsFake(function() { return false; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseGlasses();

    // assert
    expect(result).to.equal("sunglasses level three");
  });

  it('adviseGlasses_advises_to_wear_sunglasses_level_two_if_it_is_cloudy_and_it_is_not_dark', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "isDark").callsFake(function() { return false; });
    sinon.stub(conditions, "isCloudy").callsFake(function() { return true; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseGlasses();

    // assert
    expect(result).to.equal("sunglasses level two");
  });

  it('adviseGlasses_advises_to_wear_transparent_glasses_if_it_is_dark', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "isDark").callsFake(function() { return true; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseGlasses();

    // assert
    expect(result).to.equal("transparent glasses");
  });


});