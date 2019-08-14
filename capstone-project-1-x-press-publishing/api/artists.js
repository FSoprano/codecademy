const express = require('express');
const artistRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || '../database.sqlite');

artistRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Artist WHERE is_currently_employed = 1', function (err, rows) {
        if (err) {
            next(err);
        } else {
            res.status(200).json({artists: rows});
        }
    });
});

artistRouter.param('artistId', (req, res, next, id) => {
    db.get(`SELECT * FROM Artist WHERE id = ${id}`, (error, row) => {
        if (error) {
                next(error);
              } 
        else if (row) {
                    req.artist=row;
                    next();
                } 
        else {
                    res.status(404).send();
                }
    });    
  });

artistRouter.get('/:artistId', (req, res, next) => {
    res.status(200).json({artist: req.artist});
  });

module.exports = artistRouter;