const assert = require('assert');
const fs = require('fs');

describe('Math', () => {
    describe('.min', () => {
      it('returns the argument with the lowest value', () => {
        // Your test goes here
      });
      it('returns -Infinity when no arguments are provided', () => {
        // Your test goes here
      });
    });
    describe('+', () => {
        it('returns the sum of its arguments', () => {
          // Write assertion here
            assert.ok(3+4 === 7);
        });
    });
});
// Tests the JavaScript pop() method:
// Naive approach
describe('.pop', () => {
    it('returns the last element in the array [naive]', () => {
      assert.ok(['padawan', 'knight'].pop() === 'knight'); 
    });
  });
  
  // 3 phase approach
  describe('.pop', () => {
    it('returns the last element in the array [3phase]', () => {
      // Setup
      const knightString = 'knight';
      const jediPath = ['padawan', knightString];
  
      // Exercise
      const popped = jediPath.pop();
      console.log(jediPath);
  
      // Verify
      assert.ok(popped === knightString);
    });
  });

  // Teardown phase makes tests isolated by resetting conditions that were 
  // changed during the test.
  // The following test will pass when it runs for the first time. After that, it will fail.
  // It fails because the test was not isolated (no code yet under 'Teardown: delete path')

  describe('appendFileSync', () => {
    it('writes a string to text file at given path name', () => {
  
      // Setup
      const path = './message.txt';
      const str = 'Hello Node.js';
      
      // Exercise: write to file
      fs.appendFileSync(path, str);
  
      // Verify: compare file contents to string
      const contents = fs.readFileSync(path);
      assert.ok(contents.toString() === str);
  
      // Teardown: delete path, that is, the message.txt file
      fs.unlinkSync(path);
      // when the above line is active, the test is isolated (the new file will be removed 
      // each time the test is run)
    });
  });

/* If the system encounters an error before it reaches the teardown, 
it will not execute that phase. In the previous example, an error may occur 
after the file is created but before it is deleted. The file would persist 
and may cause false negatives in future test runs.
Mocha provides hooks to solve that problem. */

// In the following example, the fs.readFileSync call contains a typo (missing 'f'), 
// which causes an error. This error stops the test, so that the line 
// fs.unlinkSync(path) is never reached.
// The test is unreliable because it works as long as there is no typo.
describe('unreliable appendFileSync', () => {
    it('writes a string to text file at given path name', () => {
  
      // Setup
      const path2 = './message2.txt';
      const str2 = 'Hello World';
      
      // Exercise: write to file
      fs.appendFileSync(path2, str2);
  
      // Verify: compare file contents to string
      const contents2 = fs.readileSync(path2);
      assert.ok(contents2.toString() === str2);
  
      // Teardown: delete path, that is, the message.txt file
      fs.unlinkSync(path2);
      
    });
  });

  // To overcome the problem in the previous example, we use an 
  // afterEach hook, and move the file deletion step inside the function 
  // body of the hook. The afterEach hook executes the code it contains after 
  // the execution of each it-block in the test. This way, the test can be 
  // rerun reliably despite the typo in the fs.readfileSync call.

  describe('reliable appendFileSync using a hook', () => {
    it('writes a string to text file at given path name', () => {
  
      // Setup
      const path2 = './message2.txt';
      const str2 = 'Hello World';
      
      // Exercise: write to file
      fs.appendFileSync(path2, str2);
  
      // Verify: compare file contents to string
      const contents2 = fs.readileSync(path2);
      assert.ok(contents2.toString() === str2);
  
      // Teardown: delete path, that is, the message.txt file
      fs.unlinkSync(path2);
      
    });
  });