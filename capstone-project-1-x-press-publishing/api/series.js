const express = require('express');
const seriesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const issuesRouter = require('./issues.js');

seriesRouter.param('seriesId', (req, res, next, id) => {
    db.get(`SELECT * FROM Series WHERE id = ${id}`, (error, row) => {
        if (error) {
                next(error);
              } 
        else if (row) {
                    req.series=row;
                    next();
                } 
        else {
                    res.status(404).send();
                }
    });    
  });

seriesRouter.use('/:seriesId/issues', issuesRouter);

seriesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Series', function (err, rows) {
      if (err) {
          next(err);
      } else {
          res.status(200).json({series: rows});
      }
  });
});


seriesRouter.get('/:seriesId', (req, res, next) => {
    res.status(200).json({series: req.series});
  });

const checkReqFields = (req, res, next) => {
    const objectToCheck = req.body.series;
    if (!objectToCheck.name || !objectToCheck.description) {
      return res.sendStatus(400);
    }
    next();
  }


seriesRouter.post('/', checkReqFields, (req, res, next) => {
  
    db.run(`INSERT INTO Series (name, description) VALUES 
    ($name, $description)`, {
        $name: req.body.series.name,
        $description: req.body.series.description
    }, function (err) {
        if (err) {
          next(err);
        } 
        db.get(`SELECT * FROM Series WHERE id = $id`, 
                {$id: this.lastID},
                      (err, row) => {
              
              res.status(201).send({series: row});     
            });
        });
  });

seriesRouter.put('/:seriesId', checkReqFields, (req, res, next) => {
 
    db.run(`UPDATE Series SET name = $name, description = $description WHERE id = $seriesId`, {
        $name: req.body.series.name,
        $description: req.body.series.description,       
        $seriesId: req.params.seriesId
    }, (error) => {
        if (error) {
        next(error);
        }
        db.get(`SELECT * FROM Series WHERE id = $id`, 
                {$id: req.params.seriesId},
                      (err, row) => {
              if (!row) {
                return res.status(500).send();
              }
      
              res.status(200).send({series: row});     
            });
    });
});


module.exports = seriesRouter;