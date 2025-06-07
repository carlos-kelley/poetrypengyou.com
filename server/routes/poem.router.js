const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GETs the poem corresponding to the param number from the db

router.get("/:number", (req, res) => {
  const queryString = `SELECT * FROM "poem" WHERE "number" = $1;`;
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
