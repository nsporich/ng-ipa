var sql = require("mssql");
var connect = function() {
  var conn = new sql.ConnectionPool({
    user: 'sa',
    password: 'vc',
    server: 'cassql4\\s2000',
    database: 'IPASigning'
  });

  return conn;
};

module.exports = connect;
