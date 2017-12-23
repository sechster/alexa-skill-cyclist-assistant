let chai = require('chai');
let sinon = require('sinon');

let Sut = require('./../../src/attireBuilders/summerAttireBuilder');
let Conditions = require('./../../src/conditions');

let expect = chai.expect;


describe('SummerAttireBuilder', function() {

  it('adviseHeadGear_advises_cycling_cap_if_it_is_not_cloudy', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, 'isCloudy').callsFake( function() { return false; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseHeadGear();

    // assert
    expect(result).to.equal("cycling cap");
  });

  it('adviseHeadGear_advises_nothing_if_it_is_cloudy', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, 'isCloudy').callsFake( function() { return true; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseHeadGear();

    // assert
    expect(result).to.equal("");
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

  it('adviseShirt_advises_short_sleeve_shirt', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseShirt();

    // assert
    expect(result).to.equal("short sleeve shirt");
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

  it('adviseArmWarmers_advises_to_take_arm_warmers_if_minimum_temperature_might_fall_below_17_degrees', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 16; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseArmWarmers();

    // assert
    expect(result).to.equal("take arm warmers");
  });

  it('adviseArmWarmers_advises_not_to_take_arm_warmers_if_minimum_temperature_will_not_fall_below_17_degrees', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 17; });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseArmWarmers();

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