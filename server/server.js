const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");
const cors = require("cors");

// Route includes
const userRouter = require("./routes/user.router");
const poemRouter = require("./routes/poem.router");
const wordRouter = require("./routes/word.router");
const allPoemsRouter = require("./routes/allPoems.router");
const nextPoemRouter = require("./routes/nextPoem.router");
const lastPoemRouter = require("./routes/lastPoem.router");
//end of route includes

// Body parser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: true })
);

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/poem", poemRouter);
app.use("/api/word", wordRouter);
app.use("/api/allpoems", allPoemsRouter);
app.use("/api/nextpoem", nextPoemRouter);
app.use("/api/lastpoem", lastPoemRouter);

// Serve static files
app.use(express.static("build"));

app.use(cors());

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
