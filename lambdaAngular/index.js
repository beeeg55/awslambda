var mysql = require("mysql");
var config = require("./config.json");
var pool = mysql.createPool({
    host: config.dbhost,
    port: 3306,
    user: config.dbuser,
    password: config.password,
    database: config.dbname
});

exports.handler = (event, context, callback) => {
    console.log("dbhost " + config.dbhost)
    console.log("dbuser " + config.dbuser)
    console.log("dbname " + config.dbname)
    
    let id = parseInt(event.Id);
    console.log("event " + JSON.stringify(event))
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(pool);
    
    pool.getConnection((err, connection) => {
        console.log("we are in");
        if(event.type=="one"){
             connection.query('select productName from products where productId =' + id,
        (error, results, fields) => {
            connection.release();
            if (error) callback(error)
                else callback(null, {"status": "success", "name": results[0].Name})
        });
        }else{
             connection.query("select productName from products",
        (error, results, fields) => {
            connection.release();
            if (error) callback(error)
                else callback(null, {"status": "success", "name": results})
        });
        }
       
    });
};