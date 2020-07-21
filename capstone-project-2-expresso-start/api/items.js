const express = require('express');
const miRouter = express.Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

miRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM MenuItem WHERE MenuItem.menu_id = ${req.params.menuId}`, function (err, rows) {
        if (err) {
            next(err);
        } else {
            res.status(200).json({menuItems: rows});
        }
    });  
});

const checkMenu = (req, res, next) => {
    const item = req.body.menuItem;
    db.get(`SELECT * FROM Menu WHERE Menu.id = ${req.params.menuId}`, (err, row) => {
        if (err) {
            next(err);
        }
        else if (!item.name || !item.inventory || !item.price || !item.description || !row) {
            return res.sendStatus(400);
          } 
        else {
            next();
        }
    });
  }

miRouter.post('/', checkMenu, (req, res, next) => {
    db.run(`INSERT INTO MenuItem (name, description, inventory, price, menu_id) VALUES \
    ($name, $description, $inventory, $price, $menuId)`, {
        $name: req.body.menuItem.name,
        $description: req.body.menuItem.description,
        $inventory: req.body.menuItem.inventory,
        $price: req.body.menuItem.price,
        $menuId: req.params.menuId
    }, function (err) {
        if (err) {
          return res.status(500).send();
        } 
        db.get(`SELECT * FROM MenuItem WHERE id = $id`, 
                {$id: this.lastID},
                      (err, row) => {
              if (!row) {
                return res.status(500).send();
              }
              res.status(201).send({menuItem: row});     
            });
        });
  });

miRouter.param('menuItemId', (req, res, next, id) => {
    db.get(`SELECT * FROM MenuItem WHERE id = ${id}`, (error, row) => {
        if (error) {
            next(error);
                  } 
            else if (row) {
                        req.menuItem = row;
                        next();
                    } 
            else {
                        res.status(404).send();
                    }
        });    
      });

miRouter.put('/:menuItemId', checkMenu, (req, res, next) => {
    db.run(`UPDATE MenuItem SET name = $name, description = $description, inventory = $inventory, 
    price = $price WHERE MenuItem.id = $menuItemId`, {
        $name: req.body.menuItem.name,
        $description: req.body.menuItem.description,
        $inventory: req.body.menuItem.inventory,
        $price: req.body.menuItem.price,
        $menuItemId: req.params.menuItemId
      }, (error) => {
      if (error) {
        next(error);
      } else {
        db.get(`SELECT * FROM MenuItem WHERE MenuItem.id = $id`,
        {$id: req.params.menuItemId},
          (error, row) => {
            res.status(200).json({menuItem: row});
          });
      }
    });
  });

  miRouter.delete('/:menuItemId', (req, res, next) => {
    db.run(`DELETE FROM MenuItem WHERE id = ${req.params.menuItemId}`, (error) => {
          if (error) {
            next(error);
          } else {
            res.sendStatus(204);
          }
        });
    });

module.exports = miRouter;