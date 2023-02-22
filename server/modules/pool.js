const pg = require("pg");
let pool;
const connectionString =
  "postgresql://dbmasteruser:5E9z6O&!,?SQ~G%,2B*w|K*_@ls-835aa6aa5267dacd4bcbe9d529786ed88ce408e8.chtdfiy6xaz0.us-east-2.rds.amazonaws.com:5432/poetrypengyou";

// When our app is deployed to the internet
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg:
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
pool = new pg.Pool({
  connectionString,
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
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
