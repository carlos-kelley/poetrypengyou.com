const pg = require("pg");
let pool;

// When our app is deployed to the internet
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg:
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
pool = new pg.Pool({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: 5432,
});

// When we're running this app on our own computer
// we'll connect to the postgres database that is
// also running on our computer (localhost)

// pool = new pg.Pool({
//   host: "localhost",
//   port: 5432,
//   database: "poetry",
//   idleTimeoutMillis: 30000,
// });

module.exports = pool;
