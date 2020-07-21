const express = require('express');
const artistRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

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

const checkReqFields = (req, res, next) => {
    const objectToCheck = req.body.artist;
    if (!objectToCheck.name || !objectToCheck.dateOfBirth || !objectToCheck.biography) {
      return res.sendStatus(400);
    }
    if (objectToCheck.isCurrentlyEmployed === 0) {
        objectToCheck.isCurrentlyEmployed = 1;
    }
    next();
  }

artistRouter.post('/', checkReqFields, (req, res, next) => {
    db.run(`INSERT INTO Artist (name, date_of_birth, biography) VALUES \
    ($name, $date_of_birth, $biography)`, {
        $name: req.body.artist.name,
        $date_of_birth: req.body.artist.dateOfBirth,
        $biography: req.body.artist.biography
    }, function (err) {
        if (err) {
          return res.status(500).send();
        } 
        db.get(`SELECT * FROM Artist WHERE id = $id`, 
                {$id: this.lastID},
                      (err, row) => {
              if (!row) {
                return res.status(500).send();
              }
      
              res.status(201).send({artist: row});     
            });
        });
  });

artistRouter.put('/:artistId', checkReqFields, (req, res, next) => {
    db.run(`UPDATE Artist SET name = $name, date_of_birth = $dateOfBirth, \
    biography = $biography, is_currently_employed = $isCurrentlyEmployed 
    WHERE id = $artistId`, {
        $name: req.body.artist.name,
        $dateOfBirth: req.body.artist.dateOfBirth,
        $biography: req.body.artist.biography,
        $isCurrentlyEmployed: req.body.artist.isCurrentlyEmployed,
        $artistId: req.params.artistId
    }, (error) => {
        if (error) {
        next(error);
        }
        db.get(`SELECT * FROM Artist WHERE id = $id`, 
                {$id: req.params.artistId},
                      (err, row) => {
              if (!row) {
                return res.status(500).send();
              }
      
              res.status(200).send({artist: row});     
            });
    });
});

artistRouter.delete('/:artistId', (req, res, next) => {
    db.run(`UPDATE Artist SET is_currently_employed = 0 \
    WHERE id = ${req.params.artistId}`, 
    (error) => {
        if (error) {
            next(error);
        }
        db.get(`SELECT * FROM Artist WHERE id = ${req.params.artistId}`, 
            (err, row) => {
                if (err) {
                    return res.status(500).send();
                }
                res.status(200).send({artist: row});     
            });
    });
});

module.exports = artistRouter;