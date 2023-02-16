const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  console.log("in word get router");
  //query the database where the chinese is the same as the payload
  const queryString = `SELECT * FROM "word" WHERE "chinese" = '红';`;
  pool
    .query(queryString)
    .then((results) => {
      res.send(results.rows);
      console.log("results.rows:", results.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
