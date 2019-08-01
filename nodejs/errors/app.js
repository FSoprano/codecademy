const api = require('./api.js');


// This is the right way to do it: use an error-first callback
// If no error occurs, the first argument is undefined, and processing 
// continues with the data.
let errorFirstCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong. ${err}\n`);
  } else {
    console.log(`Something went right. Data: ${data}\n`);
  }
};
// calls the correct errorProneAsyncApi function in api.js
api.errorProneAsyncApi('problematic input', errorFirstCallback);