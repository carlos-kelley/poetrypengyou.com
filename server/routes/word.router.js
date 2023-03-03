const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


//query the database where the chinese is the same as the chinese param
//send back the english


//??where am I defining this param??
router.get("/:chinese", (req, res) => {
  const queryText = `SELECT * FROM "word" WHERE "simplified" = $1`;
  pool
    .query(queryText, [req.params.chinese])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});


module.exports = router;
