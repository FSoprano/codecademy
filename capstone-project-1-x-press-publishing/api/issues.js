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

module.exports = issuesRouter;