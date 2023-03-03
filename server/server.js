const express = require("express");
require("dotenv").config();


const app = express();


// Route includes
const poemRouter = require("./routes/poem.router");
const wordRouter = require("./routes/word.router");
const allPoemsRouter = require("./routes/allPoems.router");
const nextPoemRouter = require("./routes/nextPoem.router");
const lastPoemRouter = require("./routes/lastPoem.router");
//end of route includes


/* Routes */
app.use("/api/poem", poemRouter);
app.use("/api/word", wordRouter);
app.use("/api/allpoems", allPoemsRouter);
app.use("/api/nextpoem", nextPoemRouter);
app.use("/api/lastpoem", lastPoemRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
