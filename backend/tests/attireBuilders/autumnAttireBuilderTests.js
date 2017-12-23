let chai = require('chai');
let sinon = require('sinon');

let Sut = require('./../../src/attireBuilders/autumnAttireBuilder');
let Conditions = require('./../../src/conditions');

let expect = chai.expect;


describe('AutumnAttireBuilder', function() {

  it('adviseHeadGear_advises_to_take_balaclava_if_temperature_might_fall_below_zero', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return -1 });
    let sut = new Sut(conditions);
    
    // act
    let result = sut.adviseHeadGear();

    // assert
    expect(result).to.equal("take balaclava");
  });

  it('adviseHeadGear_advises_nothing_if_temperature_will_not_fall_below_zero', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 1 });
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

  it('adviseShirt_advises_long_sleeve_shirt', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseShirt();

    // assert
    expect(result).to.equal("long sleeve shirt");
  });

  it('adviseGloves_advises_autumn_gloves', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseGloves();

    // assert
    expect(result).to.equal("autumn gloves");
  });

  it('advisePants_advises_long_pants', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.advisePants();

    // assert
    expect(result).to.equal("long pants");
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

  it('adviseShoes_advises_high_shoes_if_temperature_will_fall_below_10_degrees', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 9 });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseShoes();

    // assert
    expect(result).to.equal("high shoes");
  });

  it('adviseShoes_advises_mtb_shoes_temperature_will_not)fall_below_10_degrees', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 11 });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseShoes();

    // assert
    expect(result).to.equal("MTB shoes");
  });

  it('adviseOvershoes_advises_overshoes_when_it_might_rain', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "itMightRain").callsFake(function() { return true });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseOvershoes();

    // assert
    expect(result).to.equal("overshoes");
  });

  it('adviseOvershoes_advises_overshoes_when_minimum_temperature_falls_below_4_degrees', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 3 });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseOvershoes();

    // assert
    expect(result).to.equal("overshoes");
  });

  it('adviseOvershoes_advises_nothing_when_minimum_temperature_is_above_4_degrees_and_it_is_not_going_to_rain', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, "getMinimumTemperature").callsFake(function() { return 5 });
    sinon.stub(conditions, "itMightRain").callsFake(function() { return false });
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseOvershoes();

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