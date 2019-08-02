const express = require('express');
const apiRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase } = require('./db');

// const minions = [{minionId: '1', name: 'Billy Blöd'}];

apiRouter.get('/api/minions/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
  });

apiRouter.put('/api/minions/', (req, res, next) => {

  if (db.isValidMinion(req.query)) {
    addToDatabase(req.query);
    res.send(getFromDatabaseById('minions', req.query.id));
  } else {
    return res.status(400).send('Minion with that ID already exists!');
  }
  
});


apiRouter.get('/api/minions/:id', (req, res, next) => {
    res.send(getFromDatabaseById('minions', req.params.id));
});

module.exports = apiRouter;
