var mysql = require("mysql");
var config = require("./config.json");
var pool = mysql.createpool({
    host: config.dbhost,
    port: config.dbport,
    user: config.dbuser,
    password: config.password,
    database: config.dbname,
});
exports.handler = (event, context, callback) => {
    pool.getConnection((err, connection) => {
        connection.query("select Name from employee where Id =" + id,
        (error, results, fields) => {
            connection.release();
            if(error) callback(error)
            else callback(null, results[0].Name)
            
        });
    })
}