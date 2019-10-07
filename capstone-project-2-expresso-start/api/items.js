const express = require('express');
const miRouter = express.Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


miRouter.get('/', (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
  db.all(`SELECT * FROM MenuItem WHERE MenuItem.menu_id = ${req.params.menuId}`, function (err, rows) {
        if (err) {
            
            next(err);
        } else {
            res.status(200).json({items: rows});
        }
    });
});

module.exports = miRouter;