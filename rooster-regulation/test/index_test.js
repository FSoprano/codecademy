const assert = require('assert');
const Rooster = require('../index.js');

describe('Rooster', () => {
 describe('.announceDawn', () => {
  	it('returns a rooster call', () => {
    // Setup
    const expected = 'cock-a-doodle-doo!';
    // Exercise
    const result = Rooster.announceDawn();
    // Verify
   	assert.ok(result === expected);
  	});
	});
  describe('.timeAtDawn', () => {
  	it('returns its argument as a string', () => {
    // Setup
    const value = 5;
    const expected = 'string';
    // Exercise
    const result = Rooster.timeAtDawn(value);
    // Verify
   	assert.strictEqual(typeof(result),expected);
  	});
    it('throws an error if passed a number less than 0', () => {
    // Setup
    const value = -6;
    
    // Exercise
   
    // Verify
   assert.throws(
 	 () => {
     Rooster.timeAtDawn(value);
  },
  RangeError
);
  	});
     it('throws an error if passed a number greater than 23', () => {
    // Setup
    const value = 35;
    // Exercise
    
    // Verify
    assert.throws(
  () => {
     Rooster.timeAtDawn(value);
  },
  RangeError
);
  	});
	});
});