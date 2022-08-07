
const { application } = require("express");
const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "root",
    database: "expense_book",
    insecureAuth: true,
});

conn.connect((err) =>{
    if(err){
        console.log(err);
    }else{
        console.log("connection sucessfully");
    }
    // conn.query("SELECT * FROM test", (err, result, fields) =>{
    //     if(err)
    //         console.log("err", err);
    //     console.log(result.length);
    // });
});

module.exports = conn;

