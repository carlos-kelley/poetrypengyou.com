const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GETs the number of the last poem from the database 
//gets the number from the params

router.get("/:number", (req, res) => {
  const queryString = `SELECT MAX (DISTINCT number) 
FROM poem
WHERE number < $1;`;
  pool
    .query(queryString, [req.params.number])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});


module.exports = router;
