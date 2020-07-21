const express = require('express');
const apiRouter = express.Router();

const menuRouter = require('./menus');
apiRouter.use('/menus', menuRouter);

const empRouter = require('./employees');
apiRouter.use('/employees', empRouter);

module.exports = apiRouter;