let chai = require('chai');
let sinon = require('sinon');

let Sut = require('./../../src/attireBuilders/winterAttireBuilder');
let Conditions = require('./../../src/conditions');

let expect = chai.expect;


describe('WinterAttireBuilder', function() {

  it('adviseHeadGear_advises_balaclava', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseHeadGear();

    // assert
    expect(result).to.equal("balaclava");
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

  it('adviseGloves_advises_winter_gloves', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseGloves();

    // assert
    expect(result).to.equal("winter gloves");
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

  it('adviseSocks_advises_warm_socks', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseSocks();

    // assert
    expect(result).to.equal("warm socks");
  });

  it('adviseShoes_advises_high_shoes', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseShoes();

    // assert
    expect(result).to.equal("high shoes");
  });

  it('adviseOvershoes_advises_overshoes', function() {

    // arrange
    let conditions = new Conditions();
    let sut = new Sut(conditions);

    // act
    let result = sut.adviseOvershoes();

    // assert
    expect(result).to.equal("overshoes");
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