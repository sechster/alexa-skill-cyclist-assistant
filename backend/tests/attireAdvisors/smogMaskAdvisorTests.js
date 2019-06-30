let chai = require('chai');
let sinon = require('sinon');

let Sut = require('./../../src/attireAdvisors/smogMaskAdvisor');
let Conditions = require('../../src/conditions');

let expect = chai.expect;


describe('smogMaskAdvisor', function() {

  it('Advises_mask_if_it_is_smoggy', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, 'isSmoggy').callsFake( function() { return true; });
    let sut = new Sut();

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).to.include.members(["wear smog mask"]);
  });


  it('Advises_no_mask_if_it_is_not_smoggy', function() {

    // arrange
    let conditions = new Conditions();
    sinon.stub(conditions, 'isSmoggy').callsFake( function() { return false; });
    let sut = new Sut();

    // act
    let result = sut.advise(conditions);

    // assert
    expect(result).not.to.include.members(["wear smog mask"]);
  });


});