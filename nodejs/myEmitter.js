let events = require('events');
let myEmitter = new events.EventEmitter();

let listenerCallback = (data) => {
    console.log('Celebrate ' + data);
}

myEmitter.on('celebration', listenerCallback);
myEmitter.emit('celebration', 'my birthday');