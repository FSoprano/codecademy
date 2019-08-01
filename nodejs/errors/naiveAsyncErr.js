const api = require('./api.js');

// Not an error-first callback
let callbackFunc = (data) => {
   console.log(`Something went right. Data: ${data}\n`);
};
  
try {
    // calls the naiveErrorProneAsyncFunction in api.js.
    // The error never gets caught! 'Something went wrong ... ' is never logged to the console!
  api.naiveErrorProneAsyncFunction('problematic input', callbackFunc);
} catch(err) {
  console.log(`Something went wrong. ${err}\n`);
}