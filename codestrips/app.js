const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('short'));

app.get('/strips', (req, res, next) => {
  db.all('SELECT * FROM Strip', (err, rows) => {
    if (err) {
      res.status(500).send();
    } else {
      res.send({strips: rows});
    }
  })
});

const validateStrip = (req, res, next) => {
  const stripToCreate = req.body.strip;
  if (!stripToCreate.head || !stripToCreate.body || !stripToCreate.bubbleType ||
      !stripToCreate.background) {
    return res.sendStatus(400);
  }
  next();
}

app.post('/strips', validateStrip, (req, res, next) => {
  

  db.run(`INSERT INTO STRIP (head, body, background, bubble_type, bubble_text, caption) VALUES ($head, $body, $background, $bubble_type, $bubble_text, $caption)`, 
         {
        	$head: req.body.strip.head,
    			$body: req.body.strip.body,
    			$background: req.body.strip.background,
    			$bubble_type: req.body.strip.bubbleType,
    			$bubble_text: req.body.strip.bubbleText,
    			$caption: req.body.strip.caption
 				 }, 
          function (err) {
    if (err) {
      return res.status(500).send();
    } 
    
     db.get(`SELECT * FROM Strip WHERE id = $id`, 
            {$id: this.lastID},
                  (err, row) => {
          if (!row) {
            return res.status(500).send();
          }
  
          res.status(201).send({strip: row});     
        });
    
     });  
});

app.listen(() => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
