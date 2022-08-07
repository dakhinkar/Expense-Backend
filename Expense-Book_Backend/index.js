const express = require("express");
const conn = require('./connection');
var cors = require('cors');


const app = express();
app.use(cors());
//WHERE YEAR(date) = 2017 AND MONTH(date) = 12
app.get('/expense/', (req, res) => {
    
    // console.log("Hello");
    // console.log(req.params)
    console.log(req.query)
    let str = `SELECT * FROM test
                WHERE YEAR(Date) = 2021  
                ORDER BY Date ASC
                LIMIT ${req.query.limit} 
                OFFSET 0
                `;
    conn.query(str, (err, result, fields) =>{
        if(err)
            console.log("err", err);
        else{
            res.send(result);
        }
    })  
    
});

// delete query 
app.put('/expense/delete/',(req, res) =>{
    let str = `DELETE FROM test
                WHERE Id =${req.query.id}`;
    conn.query(str, (err, result, fields) =>{
        if(err){
            res.send({error: true,message: "failed to delete record"});
        }else{
            res.send({error: false,message: "Successfully delete record"});
        }
    })
});

app.put('/expense/add/',(req, res) =>{
    let data = req.query;
    // INSERT INTO test(Date, Title, Description, Amount)
    let str = `INSERT INTO test(Date, Title, Description, Amount)
                VALUES(${data.date},${data.title},${data.desc},${data.amount})`;

    conn.query(str, (err, result, fields) => {
        if(err){
            console.log(err);
            res.send({error : true, message: "Faild to update record"});
        }else{
            res.send({error: false, message: "Successfully update record"});
        }
    })
});


app.listen(4500);
