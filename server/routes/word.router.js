const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
//query the database where the chinese is the same as after the slash
//send back the english
router.get("/:chinese", (req, res) => {
  const queryText = `SELECT * FROM "word" WHERE "simplified" = $1`;
  pool
    .query(queryText, [req.params.chinese])
    .then((result) => {
      res.send(result.rows);
      console.log("result.rows:", result.rows);
    })
    .catch((err) => {
      console.log(
        "Error completing SELECT word query",
        err
      );
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
