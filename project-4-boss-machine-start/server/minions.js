const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
     } = require('./db');



// const minions = [{minionId: '1', name: 'Billy Blöd'}];

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinionInstance);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
// --------------------------
minionsRouter.param('workId', (req, res, next, id) => {
  const workItem = getFromDatabaseById('work', id);
  if (workItem) {
    req.workItem = workItem;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/:minionId/work/', (req, res, next) => {
  const work = getAllFromDatabase('work').filter((element) => {
    return element.minionId === req.params.minionId;
  });
  res.send(work);

});

minionsRouter.post('/:minionId/work/', (req, res, next) => {
  const newWorkItem = addToDatabase('work', req.body);
  res.status(201).send(newWorkItem);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId === req.body.minionId) {
    let updatedWorkItem = updateInstanceInDatabase('work', req.body);
    res.send(updatedWorkItem);
  } else {
    res.status(400).send();
  }
});

minionsRouter.delete('/:minionId/work/:workID', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('work', req.params.minionId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = minionsRouter;
