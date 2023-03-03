const pg = require("pg");
let pool;

pool = new pg.Pool({
  user: "dbmasteruser",
  host: "ls-835aa6aa5267dacd4bcbe9d529786ed88ce408e8.chtdfiy6xaz0.us-east-2.rds.amazonaws.com",
  database: "postgres",
  password: "5E9z6O&!,?SQ~G%,2B*w|K$PQxC*_",
  port: 5432,
});

module.exports = pool;
