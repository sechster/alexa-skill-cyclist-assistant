const chai = require('chai');
const sinon = require('sinon');

const sut = require('./../src/attireBuildDirector');

const expect = chai.expect;


describe('AttireBuildDirector', function() {

  it('If only adviseHeadGear is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseHeadGear: function() { return "adviseHeadGear"; } });

    // assert
    expect(result).to.eql(["adviseHeadGear"]);
  });

  it('If only adviseSmogMask is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseSmogMask: function() { return "adviseSmogMask"; } });

    // assert
    expect(result).to.eql(["adviseSmogMask"]);
  });

  it('If only adviseShirt is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseShirt: function() { return "adviseShirt"; } });

    // assert
    expect(result).to.eql(["adviseShirt"]);
  });

  it('If only adviseJacket is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseJacket: function() { return "adviseJacket"; } });

    // assert
    expect(result).to.eql(["adviseJacket"]);
  });

  it('If only adviseGloves is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseGloves: function() { return "adviseGloves"; } });

    // assert
    expect(result).to.eql(["adviseGloves"]);
  });

  it('If only advisePants is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ advisePants: function() { return "advisePants"; } });

    // assert
    expect(result).to.eql(["advisePants"]);
  });

  it('If only adviseSocks is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseSocks: function() { return "adviseSocks"; } });

    // assert
    expect(result).to.eql(["adviseSocks"]);
  });

  it('If only adviseShoes is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseShoes: function() { return "adviseShoes"; } });

    // assert
    expect(result).to.eql(["adviseShoes"]);
  });

  it('If only adviseOvershoes is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseOvershoes: function() { return "adviseOvershoes"; } });

    // assert
    expect(result).to.eql(["adviseOvershoes"]);
  });

  it('If only adviseArmWarmers is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseArmWarmers: function() { return "adviseArmWarmers"; } });

    // assert
    expect(result).to.eql(["adviseArmWarmers"]);
  });

  it('If only adviseLegWarmers is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseLegWarmers: function() { return "adviseLegWarmers"; } });

    // assert
    expect(result).to.eql(["adviseLegWarmers"]);
  });

  it('If only adviseRainJacket is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseRainJacket: function() { return "adviseRainJacket"; } });

    // assert
    expect(result).to.eql(["adviseRainJacket"]);
  });

  it('If only adviseGlasses is defined on the expert only its result is returned', function() {

    // act
    let result = sut.buildAttireSet({ adviseGlasses: function() { return "adviseGlasses"; } });

    // assert
    expect(result).to.eql([ "adviseGlasses" ]);
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
    let result = sut.buildAttireSet(expert);
    
    // assert
    expect(result).to.eql(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]);
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
    let result = sut.buildAttireSet(expert);

    // assert
    expect(result).to.eql(["1", "5", "6", "8", "9", "11"]);
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
    let result = sut.buildAttireSet(expert);

    // assert
    expect(result).to.eql(["1", "7", "12", "13"]);
  });
});
