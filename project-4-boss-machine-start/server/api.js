const express = require('express');
const apiRouter = express.Router();
module.exports = apiRouter;
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
    createMeeting
     } = require('./db');

// const minions = [{minionId: '1', name: 'Billy Blöd'}];

apiRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

apiRouter.get('/api/minions/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

apiRouter.post('/api/minions/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

apiRouter.get('/api/minions/:minionId', (req, res, next) => {
  res.send(req.minion);
});

apiRouter.put('/api/minions/:minionId', (req, res, next) => {
  let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinionInstance);
});

apiRouter.delete('/api/minions/:minionId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

apiRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

apiRouter.get('/api/ideas/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

apiRouter.post('/api/ideas/', (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

apiRouter.get('/api/ideas/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

apiRouter.put('/api/ideas/:ideaId', (req, res, next) => {
  let updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdeaInstance);
});

apiRouter.delete('/api/ideas/:ideaId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

apiRouter.get('/api/meetings/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

apiRouter.post('/api/meetings/', (req, res, next) => {
  const newMeeting = createMeeting();
  addToDatabase('meetings', newMeeting);
  res.status(201).send(newMeeting);
  
});

apiRouter.delete('/api/meetings/', (req, res, next) => {
  const deleted = deleteAllFromDatabase('meetings');
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});