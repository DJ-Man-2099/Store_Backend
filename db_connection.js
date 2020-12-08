const mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"1970",
    database: "DJ",
});

con.connect((err)=>{
    var sql = "USE Store;";
    var sql2 = "ALTER TABLE Transaction ADD FOREIGN KEY (Product) REFERENCES Product(ID) ON DELETE CASCADE;";
    con.query(sql,
        (err,result)=>{
        if (err) throw (err);
        console.log(result);
    }); 
    /*con.query(sql2,
        (err,result)=>{
        if (err) throw (err);
        console.log(result);
    });*/
    
});

module.exports = con; //For Exporting a variable