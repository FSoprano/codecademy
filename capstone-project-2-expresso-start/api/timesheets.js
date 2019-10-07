const express = require('express');
const tsRouter = express.Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');



tsRouter.get('/', (req, res, next) => {
  db.all(`SELECT * FROM Timesheet WHERE Timesheet.employee_id = ${req.params.employeeId}`, function (err, rows) {
        if (err) {
            next(err);
        } else {
            res.status(200).json({timesheets: rows});
        }
    });
});


const checkTimesheet= (req, res, next) => {
    const timesheet = req.body.timesheet;
    
    if (!timesheet.hours || !timesheet.rate || !timesheet.date) {
      return res.sendStatus(400);
    } 
    next();
  }

tsRouter.post('/', checkTimesheet, (req, res, next) => {
    
    console.log(req.body);
    db.run(`INSERT INTO Timesheet (hours, rate, date, employee_id) VALUES 
    ($hours, $rate, $date, $empId)`, {
        $hours: req.body.timesheet.hours,
        $rate: req.body.timesheet.rate,
        $date: req.body.timesheet.date,
        $empId: req.params.employeeId
    }, function (err) {
        if (err) {
          next(err);
        } 
        db.get(`SELECT * FROM Timesheet WHERE Timesheet.id = ${this.lastID}`, 
                                     function (err, row) {
              
               res.status(201).json({timesheet: row});     
            });
        });
  });

  tsRouter.param('timesheetId', (req, res, next, id) => {
    db.get(`SELECT * FROM Timesheet WHERE Timesheet.id = ${id}`, (error, row) => {
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

tsRouter.put('/:timesheetId', checkTimesheet, (req, res, next) => {
    
    db.run(`UPDATE Timesheet SET hours=$hours, rate=$rate, date=$date WHERE
    Timesheet.id = ${req.params.timesheetId}`, {
        $hours: req.body.timesheet.hours,
        $rate: req.body.timesheet.rate,
        $date: req.body.timesheet.date,
    }, function (error) {
        if (error) {
        next(error);
        }
        db.get(`SELECT * FROM Timesheet WHERE id = ${req.params.timesheetId}`,
            function (err, row) {
              if (!row) {
                return res.status(500).send();
              }
              res.status(200).json({timesheet: row});     
            });
    });
});

tsRouter.delete('/:timesheetId', (req, res, next) => {
    db.run(`DELETE FROM Timesheet WHERE id = ${req.params.timesheetId}`, (error) => {
          if (error) {
            next(error);
          } else {
            res.sendStatus(204);
          }
        });
    });


module.exports = tsRouter;