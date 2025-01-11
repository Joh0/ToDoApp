const db = require("./db");

addItem = (req, res) => {
    const { id, item, priority, category, name, group, status } = req.body;
    // Left out id because if id = 0, id is false
    if( !item || !priority || !category || !name || !group || !status ){
        return res.status(400).json({ message: "Item has null attributes!"});
    }
    var sql = "INSERT INTO to_do_items VALUES (?,?,?,?,?,?,?)";
    db.query(sql, [ id, item, priority, category, name, group, status ], (err) => {
        if(err){
            return res.status(400).json({ message: "Invalid item attributes", error: err.message});
        }
        else{
            return res.status(201).json({ message: "Item added successfully!"});
        }
    })
}

// Sample for postman
/*
{
"id": 0,
"item": "laundry",
"priority": 10,
"category": "household",
"name": "tim",
"group": "lim",
"status": "active"
}
*/

module.exports = { addItem };