const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errHandler = require('errorhandler');

const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(errHandler());
app.use(cors());

const apiRouter = require('./api/api');
app.use('/api', apiRouter);

app.listen(() => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
