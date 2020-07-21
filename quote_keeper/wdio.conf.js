// wdio.conf.js
const app = require('./app');
const port = 4444;
// Uncomment this line once directed by an error message
const {connectAndDrop, disconnect} = require('./database');

let expressServer;

exports.config = {
  specs: [
    'test/features/*.js',
  ],
  coloredLogs: true,
  baseUrl: `http://localhost:${port}`,
  framework: 'mocha',
  reporters: ['spec'],
  waitforTimeout: 10 * 1000,
  capabilities: [{
    browserName: 'phantomjs',
   
  }],
  services: ['phantomjs'],

  async onPrepare() {
    // Uncomment this line once directed by an error message
    connectAndDrop();
    expressServer = app.listen(port);
  },
  async onComplete() {
    // Uncomment this line once directed by an error message
    disconnect();
    await expressServer.close();
  },
};
