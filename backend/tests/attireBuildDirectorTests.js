const chai = require('chai');
const sinon = require('sinon');

const sut = require('./../src/attireBuildDirector');

const expect = chai.expect;


describe('AttireBuildDirector', function() {

  it('If only adviseHeadGear is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseHeadGear: function() { return "adviseHeadGear"; } });

    // assert
    expect(result).to.equal("adviseHeadGear");
  });

  it('If only adviseSmogMask is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseSmogMask: function() { return "adviseSmogMask"; } });

    // assert
    expect(result).to.equal("adviseSmogMask");
  });

  it('If only adviseShirt is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseShirt: function() { return "adviseShirt"; } });

    // assert
    expect(result).to.equal("adviseShirt");
  });

  it('If only adviseJacket is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseJacket: function() { return "adviseJacket"; } });

    // assert
    expect(result).to.equal("adviseJacket");
  });

  it('If only adviseGloves is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseGloves: function() { return "adviseGloves"; } });

    // assert
    expect(result).to.equal("adviseGloves");
  });

  it('If only advisePants is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ advisePants: function() { return "advisePants"; } });

    // assert
    expect(result).to.equal("advisePants");
  });

  it('If only adviseSocks is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseSocks: function() { return "adviseSocks"; } });

    // assert
    expect(result).to.equal("adviseSocks");
  });

  it('If only adviseShoes is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseShoes: function() { return "adviseShoes"; } });

    // assert
    expect(result).to.equal("adviseShoes");
  });

  it('If only adviseOvershoes is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseOvershoes: function() { return "adviseOvershoes"; } });

    // assert
    expect(result).to.equal("adviseOvershoes");
  });

  it('If only adviseArmWarmers is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseArmWarmers: function() { return "adviseArmWarmers"; } });

    // assert
    expect(result).to.equal("adviseArmWarmers");
  });

  it('If only adviseLegWarmers is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseLegWarmers: function() { return "adviseLegWarmers"; } });

    // assert
    expect(result).to.equal("adviseLegWarmers");
  });

  it('If only adviseRainJacket is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseRainJacket: function() { return "adviseRainJacket"; } });

    // assert
    expect(result).to.equal("adviseRainJacket");
  });

  it('If only adviseGlasses is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAdvice({ adviseGlasses: function() { return "adviseGlasses"; } });

    // assert
    expect(result).to.equal("adviseGlasses");
  });

  it('If all functions are defined on the expert, and they all return non empty results, everything is concatenated', function() {

    // arrange
    let expert =
        { 
            adviseHeadGear: function() { return "1"; },
            adviseSmogMask: function() { return "2"; },
            adviseShirt: function() { return "3"; },
            adviseJacket: function() { return "4"; },
            adviseGloves: function() { return "5"; },
            advisePants: function() { return "6"; },
            adviseSocks: function() { return "7"; },
            adviseShoes: function() { return "8"; },
            adviseOvershoes: function() { return "9"; },
            adviseArmWarmers: function() { return "10"; },
            adviseLegWarmers: function() { return "11"; },
            adviseRainJacket: function() { return "12"; },
            adviseGlasses: function() { return "13"; },
        };

    // act
    let result = sut.buildAdvice(expert);

    // assert
    expect(result).to.equal("1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13");
  });

  it('If all functions are defined on the expert, and some of them return empty results, they are omitted', function() {

    // arrange
    let expert = 
        { 
            adviseHeadGear: function() { return "1"; },
            adviseSmogMask: function() { return ""; },
            adviseShirt: function() { return ""; },
            adviseJacket: function() { return ""; },
            adviseGloves: function() { return "5"; },
            advisePants: function() { return "6"; },
            adviseSocks: function() { return ""; },
            adviseShoes: function() { return "8"; },
            adviseOvershoes: function() { return "9"; },
            adviseArmWarmers: function() { return ""; },
            adviseLegWarmers: function() { return "11"; },
            adviseRainJacket: function() { return ""; },
            adviseGlasses: function() { return ""; },
        };

    // act
    let result = sut.buildAdvice(expert);

    // assert
    expect(result).to.equal("1, 5, 6, 8, 9, 11");
  });

  it('If some functions are defined on the expert, and they all return non empty results, only those are concatenated', function() {

    // arrange
    let expert = 
        { 
            adviseHeadGear: function() { return "1"; },
            adviseSocks: function() { return "7"; },
            adviseRainJacket: function() { return "12"; },
            adviseGlasses: function() { return "13"; },
        };

    // act
    let result = sut.buildAdvice(expert);

    // assert
    expect(result).to.equal("1, 7, 12, 13");
  });
});
