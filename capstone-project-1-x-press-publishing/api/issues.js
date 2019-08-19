const express = require('express');
const issuesRouter = express.Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

issuesRouter.get('/', (req, res, next) => {
  db.all(`SELECT * FROM Issue WHERE Issue.series_id = ${req.params.seriesId}`, function (err, rows) {
        if (err) {
            next(err);
        } else {
            res.status(200).json({issues: rows});
        }
    });
});

const checkIssueFields = (req, res, next) => {
    const objectToCheck = req.body.issue;
    console.log(req.params);
    // console.log(req.body.seriesId);
    const idquery = db.get(`SELECT * FROM Issue WHERE artist_id = ${objectToCheck.artistId}`);
    if (!objectToCheck.name || !objectToCheck.issueNumber || !objectToCheck.publicationDate || !objectToCheck.artistId) {
      return res.sendStatus(400);
    } else if (idquery === null) {
        return res.sendStatus(400);
    }
    next();
  }

issuesRouter.post('/', checkIssueFields, (req, res, next) => {
    
    
    db.run(`INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id) VALUES 
    ($name, $issueNumber, $publicationDate, $artistId, $seriesId)`, {
        $name: req.body.issue.name,
        $issueNumber: req.body.issue.issueNumber,
        $publicationDate: req.body.issue.publicationDate,
        $artistId: req.body.issue.artistId,
        $seriesId: req.params.seriesId
    }, function (err) {
        if (err) {
          next(err);
        } 
        db.get(`SELECT * FROM Issue WHERE Issue.id = ${this.lastID}`, 
                                     function (err, row) {
              
               res.status(201).json({issue: row});     
            });
        });
  });

module.exports = issuesRouter;