const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


// GETs all poems from the database in ascending order by number
router.get("/", (req, res) => {
  const queryString = `SELECT * FROM "poem" ORDER BY "number" ASC;`;  
  pool
    .query(queryString)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});


module.exports = router;
