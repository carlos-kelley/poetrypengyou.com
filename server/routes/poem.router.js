const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
    console.log("req query: ", req.query);
  // GET route code here
    const queryText = `SELECT * FROM "poem" WHERE "id" = $1;`;
    pool 
        .query(queryText, [req.query.id])
        .then((result) => {
            res.send(result.rows);
        }
    )
        .catch((error) => {
            console.log("Error in poem.router GET: ", error);
            res.sendStatus(500);
        }
    )
    
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
