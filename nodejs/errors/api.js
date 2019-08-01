module.exports = {
    errorProneAsyncApi: (input, callback) => {
        // This is the right way to do it for synchronous calls
      console.log(`Running errorProneAsyncApi with input: ${input}...\n`)
      setTimeout(() => {
        let myErr;
        if (input === 'problematic input') {
          myErr = new Error('whoops')
          callback(myErr)
        } else {
          let responseData = `Received valid input "${input}"`
          callback(myErr, responseData)
        }
      }, 0)
    },
    
    naiveErrorProneAsyncFunction: (input, callback) => {
        // try, catch, and throw only work for synchronous calls! This does not work.
      console.log(`Running naiveErrorProneAsyncFunction with input: ${input}...\n`)
      setTimeout(() => {
        if (input === 'problematic input') {
          throw new Error('whoops')
        } else {
          let responseData = `Received valid input "${input}"`
          callback(responseData)
        }
      }, 0)
  }
    
  }