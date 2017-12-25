const chai = require('chai');
const sut = require('./../src/duration');
const moment = require('moment');

const expect = chai.expect;

describe('Duration', function(){

    it('getText should return 1 hour and 1 minute for 1:01 long timespan', function(){
        // arrange
        let start = moment().toDate();
        let end = moment().add(1, 'h').add(1, 'm').toDate()
        
        // act
        let result = sut.getText(start, end);

        // assert
        expect(result).to.equal("1 hour and 1 minute");
    });

    it('getText should return 2 hours and 2 minutes for 2:02 long timespan', function(){
        // arrange
        let start = moment().toDate();
        let end = moment().add(2, 'h').add(2, 'm').toDate()
        
        // act
        let result = sut.getText(start, end);

        // assert
        expect(result).to.equal("2 hours and 2 minutes");
    });

});

