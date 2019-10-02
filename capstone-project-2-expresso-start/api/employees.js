const express = require('express');
const empRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

empRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Employee WHERE is_current_employee = 1', function (err, rows) {
        if (err) {
            next(err);
        } else {
            res.status(200).json({employees: rows});
        }
    });
});

empRouter.param('employeeId', (req, res, next, id) => {
    db.get(`SELECT * FROM Employee WHERE id = ${id}`, (error, row) => {
        if (error) {
                next(error);
              } 
        else if (row) {
                    req.employee=row;
                    next();
                } 
        else {
                    res.status(404).send();
                }
    });    
  });

empRouter.get('/:employeeId', (req, res, next) => {
    res.status(200).json({employee: req.employee});
  });

const checkReqFields = (req, res, next) => {
    const objectToCheck = req.body.employee;
    
    if (!objectToCheck.name || !objectToCheck.position || !objectToCheck.wage) {
      return res.sendStatus(400);
    }
    
    next();
  }

empRouter.post('/', checkReqFields, (req, res, next) => {
    db.run(`INSERT INTO Employee (name, position, wage) VALUES \
    ($name, $position, $wage)`, {
        $name: req.body.employee.name,
        $position: req.body.employee.position,
        $wage: req.body.employee.wage
    }, function (err) {
        if (err) {
          return res.status(500).send();
        } 
        db.get(`SELECT * FROM Employee WHERE id = $id`, 
                {$id: this.lastID},
                      (err, row) => {
              if (!row) {
                return res.status(500).send();
              }
              res.status(201).send({employee: row});     
            });
        });
  });

  

empRouter.put('/:employeeId', checkReqFields, (req, res, next) => {
    
    // die Sau hat den hier erst gesetzt. Ich wußte nicht, dass das geht.
    const isCurrentEmployee = req.body.employee.isCurrentEmployee === 0 ? 0 : 1;

    // bedenkt man, dass req.body.employee.isCurrentEmployee gar nicht definiert ist, 
    // ist es um so bemerkenswerter, dass hier eine 0 - Abfrage funktioniert.

    // Wieso das mit dem ternary operator geht, aber nicht mit einer regulären if-Klausel ist 
    // mir auch nicht klar.
    // Soll heißen: das hier geht nicht:
    /* const isCurrentEmployee = req.body.employee.isCurrentEmployee;

    if (isCurrentEmployee === 0) {
        isCurrentEmployee = 1;
               
    }
    */  
    db.run(`UPDATE Employee SET name = $name, position = $position, 
    wage = $wage, is_current_employee = $isCurrentEmployee
    WHERE Employee.id = $employeeId`, {
        $name: req.body.employee.name,
        $position: req.body.employee.position,
        $wage: req.body.employee.wage,
        $isCurrentEmployee: isCurrentEmployee,
        $employeeId: req.params.employeeId
      }, (error) => {
      if (error) {
        next(error);
      } else {
        db.get(`SELECT * FROM Employee WHERE Employee.id = $id`,
        {$id: req.params.employeeId},
          (error, row) => {
            res.status(200).json({employee: row});
          });
      }
    });
  });
  
module.exports = empRouter;