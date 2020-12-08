var express = require('express');
var app = express(); //For routing
var bodyParser = require("body-parser"); //For Post Requests
var urlParser = bodyParser.urlencoded({ extended: false });
var con = require("./db_connection");


//6) Get Transactions
app.post("/Transactions", (req, res) => {
    try {
        const ID = req.Body.ID;
       const query1 = "SELECT Transaction.Timestamp ,Person.Name as Buyer , Product.Name as Product " + //Returns Sold Transactions
            "FROM Transaction INNER JOIN Person ON Person.ID = Transaction.Buyer "+
            "INNER JOIN Product ON Product.ID = Transaction.Product WHERE Transaction.Buyer = ? ;";
        const query2 = "SELECT Transaction.Timestamp ,Person.Name as Seller , Product.Name as Product " + //Returns Bought Transactions
            "FROM Transaction INNER JOIN Product ON Product.ID = Transaction.Product " +
            "INNER JOIN Person ON Product.Owner = Person.ID WHERE Product.Owner = ? ;";
        var temp;
        con.query(
            query1,[ID],
            (err, result) => {
                if (err) throw (err);
                temp = result
            }
        );
       con.query(
            query2, [ID],
            (err, result) => {
                if (err) throw (err);
                res.json({
                    "success": true,
                    "Sold": temp,
                    "Bought": result
                })
            }
        );
    } catch (error) {
        res.json({
            "success": false,
            "error": error
        })
    }
});

//7) Get Products by ID
app.post("/Products", (req, res) => {
    try {
        const ID = req.body.ID;
        //Returns Products By Name
        const query = "SELECT Product.Name, Product.Location, Person.Name as Owner " + 
            "FROM Product INNER JOIN Person ON Person.ID = Product.Owner WHERE Product.ID = ? ;";
        con.query(
            query, [ID],
            (err, result) => {
                if (err) throw (err);
                res.json({
                    "success": true,
                    "Products": result
                })
            }
        );
    } catch (error) {
        res.json({
            "success": false,
            "error": error
        })
    }
});

//8) Get Products by location
//9) HomePage = Get Products by Location    
app.post("/Products", (req, res) => {
    try {
        const Location = req.body.Location;
        //Returns Products by Location "Add the rest of the Attributes"
        const query ="SELECT Product.Name, Product.Location, Person.Name as Owner FROM Product INNER JOIN Person ON Person.ID = Product.Owner WHERE Product.Location = ? ;";
        con.query(
            query, [Location],
            (err, result) => {
                if (err) throw (err);
                res.json({
                    "success": true,
                    "Products": result
                });
            }
        );
    } catch (error) {
        res.json({
            "success": false,
            "error": error
        })
    }
});

//8) Profile (Mine or Other)
app.post("/Profiles", (req, res) => {
    try {
        const ID = req.Body.ID;
        //Returns Profile
        const query1 = "SELECT *" + 
            "FROM Person WHERE Person.ID = ? ;";
        const query2 = "SELECT Product.ID, Product.Name FROM Product WHERE Product.Owner = ?;";
        var temp;
        con.query(
            query1,[ID],
            (err, result) => {
                if (err) throw (err);
                temp = result;
            }
        );
        con.query(
            query2,[ID],
            (err, result) => {
                if (err) throw (err);
               res.json({
                    "success": true,
                    "data": temp,
                    "Products": result
                });
            }
        );
    } catch (error) {
        res.json({
            "success": false,
            "error": error
        })
    }
});

//10) Edit Profile (include Remove) (Mine "Use Authentication")
app.post("/Edit/Profile",(req,res)=>{
    try {
        const ID = req.body.ID;
        const Remove = req.body.Remove;
        const Name = req.body.Name;
        const Password = req.body.Password;
        
        if(Remove==true) {
            const query = "DELETE FROM Person WHERE ID = ?  ";
            con.query(query,[ID],(err,result)=>{
                if(err) throw (err);
                console.log(result);
            });
        }
        else {
            const query = "UPDATE Person SET Name = ?, Password = sha2(?,256) WHERE ID = ? ";
            con.query(query,[Name, Password, ID],(err,result)=>{
                if(err) throw (err);
                console.log(result);
            });
    }
    } catch (error) {
        res.json({
            "success": false,
            "error": error
        })
    }
});


app.listen(3000, () => {
    console.log("Server is working.")
});