let chai = require('chai');
let sinon = require('sinon');

let SummerClothingExpert = require('./../summerClothingExpert');
let Conditions = require('./../conditions');

let expect = chai.expect;


describe('SummerClothingExpert', function() {
  it('Test1', function() {
    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, 'isSunny').callsFake( function() { return true; });
    sinon.stub(conditions, 'isCloudy').callsFake( function() { return true; });
    sinon.stub(conditions, 'isDark').callsFake( function() { return true; });
    sinon.stub(conditions, 'isSmoggy').callsFake( function() { return true; });
    sinon.stub(conditions, 'isChilly').callsFake( function() { return true; });
    sinon.stub(conditions, 'itMightRain').callsFake( function() { return true; });
    let sut = new SummerClothingExpert(conditions);

    // act
    let result = sut.getAdvice();

    // assert
    expect(result).to.equal("");
  });
});