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

const checkPutIssueFields = (req, res, next) => {
    const objectToCheck = req.body.issue;
    // console.log(req.params);
    // console.log(req.body);
    const artistquery = db.get(`SELECT * FROM Artist WHERE id = ${req.body.issue.artistId}`);
    // const idquery = db.get(`SELECT * FROM Issue WHERE id = ${req.params.issueId}`);
    if (!objectToCheck.name || !objectToCheck.issueNumber || !objectToCheck.publicationDate || !objectToCheck.artistId) {
      return res.sendStatus(400);
    } else if (artistquery === null) {
      return res.sendStatus(400);
    }
    
    next();
  }


issuesRouter.param('issueId', (req, res, next, id) => {
  db.get(`SELECT * FROM Issue WHERE id = ${id}`, (error, row) => {
      if (error) {
              next(error);
            } 
      else if (row) {
          next();
              } 
      else {
          res.status(404).send();
              }
  });    
});


issuesRouter.put('/:issueId', checkPutIssueFields, (req, res, next) => {
    //console.log(req.params);
    //console.log(req.body.issue);
    db.run(`UPDATE Issue SET name = $name, issue_number = $issueNumber, 
    publication_date=$publicationDate, artist_id=$artistId WHERE id = ${req.params.issueId}`, {
        $name: req.body.issue.name,
        $issueNumber: req.body.issue.issueNumber,
        $publicationDate: req.body.issue.publicationDate,
        $artistId: req.body.issue.artistId
    }, function (error) {
        if (error) {
        next(error);
        }
        db.get(`SELECT * FROM Issue WHERE id = $id`, 
                {$id: req.params.issueId},
                      function (err, row) {
              if (!row) {
                return res.status(500).send();
              }
              res.status(200).json({issue: row});     
            });
    });
});

issuesRouter.delete('/:issueId', (req, res, next) => {
  db.run(`DELETE FROM Issue WHERE id = ${req.params.issueId}`, (error) => {
        if (error) {
          next(error);
        } else {
          res.sendStatus(204);
        }
      });
  });

module.exports = issuesRouter;