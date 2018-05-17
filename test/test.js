"use strict";

var expect = require("chai").expect;
var HeikinAshi = require("../index");

describe("#HeikinAshi", function() {
  it("should return [] if input is null", function() {
    var result = HeikinAshi();
    expect(result).to.deep.equal([]);
  });

  it("should return an array of length 1 if input is of length 1", function() {
    var result = HeikinAshi([
      {
        time: 1525651200,
        close: 9377.81,
        high: 9662.23,
        low: 9202.13,
        open: 9643.99,
        volume: 73842.44
      }
    ]);
    expect(result).to.deep.equal([
      {
        close: 9471.539999999999,
        high: 9662.23,
        low: 9202.13,
        open: 9643.99,
        time: 1525651200,
        volume: 73842.44
      }
    ]);
  });

  it("should return an array of the same length, and implement heikin ashi", function() {
    let input = [
      {
        time: 1525651200,
        close: 9377.81,
        high: 9662.23,
        low: 9202.13,
        open: 9643.99,
        volumefrom: 73842.44,
        volumeto: 692580062.51
      },
      {
        time: 1525737600,
        close: 9196.13,
        high: 9472.09,
        low: 9063.07,
        open: 9377.08,
        volumefrom: 72659.12,
        volumeto: 673924125.29
      },
      {
        time: 1525824000,
        close: 9321.16,
        high: 9373.46,
        low: 8987.27,
        open: 9196.13,
        volumefrom: 67939.11,
        volumeto: 625495066.08
      },
     
    ]
    var result = HeikinAshi(input);
    expect(result).to.have.lengthOf(input.length);
    expect(result[2].close).to.be.equal((input[2].open + input[2].high + input[2].low+ input[2].close)/4);
    expect(result[2].open).to.be.equal((result[1].open + result[1].close)/2);
    expect(result[2].high).to.be.equal(Math.max(input[2].high , result[2].open , result[2].close));
    expect(result[2].low).to.be.equal(Math.min(input[2].low , result[2].open , result[2].close));
  });

  it("should not overwrite the original data with overWrite:false", function() {
    let input = [
      {
        time: 1525651200,
        close: 9377.81,
        high: 9662.23,
        low: 9202.13,
        open: 9643.99,
        volumefrom: 73842.44,
        volumeto: 692580062.51
      },
      {
        time: 1525737600,
        close: 9196.13,
        high: 9472.09,
        low: 9063.07,
        open: 9377.08,
        volumefrom: 72659.12,
        volumeto: 673924125.29
      },
      {
        time: 1525824000,
        close: 9321.16,
        high: 9373.46,
        low: 8987.27,
        open: 9196.13,
        volumefrom: 67939.11,
        volumeto: 625495066.08
      },
     
    ]
    var result = HeikinAshi(input, {overWrite:false});
    expect(result).to.not.deep.equal(input);
  });

  it("should overwrite the original data overWrite:true", function() {
    let input = [
      {
        time: 1525651200,
        close: 9377.81,
        high: 9662.23,
        low: 9202.13,
        open: 9643.99,
        volumefrom: 73842.44,
        volumeto: 692580062.51
      },
      {
        time: 1525737600,
        close: 9196.13,
        high: 9472.09,
        low: 9063.07,
        open: 9377.08,
        volumefrom: 72659.12,
        volumeto: 673924125.29
      },
      {
        time: 1525824000,
        close: 9321.16,
        high: 9373.46,
        low: 8987.27,
        open: 9196.13,
        volumefrom: 67939.11,
        volumeto: 625495066.08
      },
     
    ]
    var result = HeikinAshi(input, {overWrite:true});
    expect(result).to.deep.equal(input);
  });

});
