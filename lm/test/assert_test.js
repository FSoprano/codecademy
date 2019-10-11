const assert = require('assert');

// More asserts:
    describe('This test throws an error because it evaluates to false.', () => {
      it('returns the difference of two values', () => {
        const bigNum = 100;
        const smallNum = 4;
        const expected = 96;
        
        const result =  bigNum - smallNum;
    
        // Write assertion here
        assert.ok(result === 91);
        // This throws an  error.
        
      });
    });
    // Same as above, but error removed:
    describe('This test passes.', () => {
      it('returns the difference of two values', () => {
        const bigNum = 100;
        const smallNum = 4;
        const expected = 96;
        
        const result =  bigNum - smallNum;
    
        // Write assertion here
        assert.ok(result === expected);
        
      });
    });

    // assert.ok vs. assert equal:
    // assert.equal checks for equality. It is often easier to write because
    // it does not require a comparing expression inside the parentheses.
    // Same result 

    describe('This test uses assert.equal rather than assert.ok.', () => {
        it('assert.equal: same result as previous example: it returns the difference of two values', () => {
          const bigNum = 100;
              const smallNum = 4;
              const expected = 96;
          
          const result =  bigNum - smallNum;
      
          // Write assertion here
          assert.equal(result, expected);
        });
      });

      describe('This test will pass, although one of the numbers is a string (==)', () => {
        it('assert.equal loose comparison: returns the difference of two values', () => {
          const bigNum = 100;
              const smallNum = 4;
              const expected = '96';
          
          const result =  bigNum - smallNum;
      
          // Write assertion here
          assert.equal(result, expected);
          // The == comparison involves a type conversion.
        });
      });

      describe('This test will not pass.', () => {
        it('assert.strictEqual strict comparison (===). Error is thrown if one of the operators is a string.', () => {
          const bigNum = 100;
              const smallNum = 4;
              const expected = '96';
          
          const result =  bigNum - smallNum;
      
          // Write assertion here
          assert.strictEqual(result, expected);
        });
      });

      describe('+. This throws an error because distinct objects are not considered equal when compared \
      using strict or loose equality', () => {
        it('returns the sum of two values', () => {
          // Setup
              let expected = {a: 3, b: 4, result: 7};
              let sum = {a: 3, b: 4};
      
          // Exercise
              sum.result = sum.a + sum.b;
      
          // Verify
          assert.equal(sum, expected);
        });
      });

      describe('To compare distinct objects, you have to use assert.deepEqual', () => {
        it('returns the sum of two values', () => {
          // Setup
              let expected = {a: 3, b: 4, result: 7};
              let sum = {a: 3, b: 4};
      
          // Exercise
              sum.result = sum.a + sum.b;
      
          // Verify
          assert.deepEqual(sum, expected);
        });
      });

      describe('The same is true for arrays.', () => {
        it('returns the sum of two values', () => {
          // Setup
              let expected = [3, 4, 7];
              let sum = [3, 4];
      
          // Exercise
              sum.push(3 + 4);
      
          // Verify
          assert.deepEqual(sum, expected);
        });
      });
    
      describe('Unequal numbers', () => {
        it('1 does not equal 2', () => {
          // Verify
          assert.notEqual(1,2);
          // rather than assert.ok(1 !== 2);
        });
      });