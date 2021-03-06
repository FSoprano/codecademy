const express = require('express');
const menuRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
const miRouter = require('./items');

menuRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Menu', function (err, rows) {
        if (err) {
            next(err);
        } else {
            res.status(200).json({menus:rows});
        }
    });
});

menuRouter.param('menuId', (req, res, next, id) => {
      db.get(`SELECT * FROM Menu WHERE id = ${id}`, (error, row) => {
          if (error) {
                  next(error);
                } 
          else if (row) {
                      req.menu=row;
                      next();
                  } 
          else {
                      res.status(404).send();
                  }
      });    
    });

menuRouter.get('/:menuId', (req, res, next) => {
    res.status(200).json({menu: req.menu});
  });

const checkMenu = (req, res, next) => {    
    if (!req.body.menu.title) {
      return res.sendStatus(400);
    }    
    next();
  }

menuRouter.post('/', checkMenu, (req, res, next) => {
  db.run(`INSERT INTO Menu (title) VALUES \
    ($title)`, {
        $title: req.body.menu.title,
    }, function (err) {
        if (err) {
          return res.status(500).send();
        } 
        db.get(`SELECT * FROM Menu WHERE id = $id`, 
                {$id: this.lastID},
                      (err, row) => {
              if (!row) {
                return res.status(500).send();
              }
              res.status(201).send({menu: row});     
            });
        });
  });

menuRouter.put('/:menuId', checkMenu, (req, res, next) => {
    db.run(`UPDATE Menu SET title = $title
    WHERE Menu.id = $menuId`, {
        $title: req.body.menu.title,
        $menuId: req.params.menuId
      }, (error) => {
      if (error) {
        next(error);
      } else {
        db.get(`SELECT * FROM Menu WHERE Menu.id = $id`,
        {$id: req.params.menuId},
          (error, row) => {
            res.status(200).json({menu: row});
          });
      }
    });
  });

menuRouter.delete('/:menuId', (req, res, next) => {
    db.get(`SELECT * FROM MenuItem WHERE MenuItem.menu_id = ${req.params.menuId}`, (error, item) => {
      if (error) {
        next(error);
      } else if (item) {
        return res.sendStatus(400);
      } else {
        db.run(`DELETE FROM Menu WHERE id = ${req.params.menuId}`, (error) => {
          if (error) {
            next(error);
          } else {
            res.sendStatus(204);
          }
        });
      }
    });
  });

menuRouter.use('/:menuId/menu-items', miRouter);

module.exports = menuRouter;