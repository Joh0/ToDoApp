const db = require("./db");

// Sample for postman
/*
{
"id": 1,
"item": "laundry",
"priority": 6,
"category": "household"
}
*/

editItem = (req, res) => {
    const { id, item, priority, category } = req.body;
    if( !item || !priority || !category ){
        return res.status(400).json({ message: "Item has null attributes!"});
    }
    var sql = "UPDATE to_do_items SET item = ?, priority = ?, category = ? where id = ?";
    db.query(sql, [item, priority, category, id], (err) => {
        if(err){
            res.status(500).json({ message: "Failed to update item to the list!", error: err.message });
        }
        else{
            res.status(200).json({ message: "Item updated successfully!" });
        }
    })
}

// Sample for postman
// http://localhost:3000/api/markComplete
/*
{
    "ids": [8, 9]
}
*/
markComplete = (req, res) => {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Invalid or missing 'ids' in request body" });
    }
    var sql = "UPDATE to_do_items SET status = 'completed' where id in (?)";
    db.query(sql, ids, (err, result) => {
        if(err){
            res.status(500).json({ message: "Failed to mark item(s) as complete!", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No matching items found to update" });
        }
        else{
            res.status(200).json({ message: "Item(s) marked complete!" });
        }
    })
}

markActive = (req, res) => {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Invalid or missing 'ids' in request body" });
    }
    var sql = "UPDATE to_do_items SET status = 'active' where id in (?)";
    db.query(sql, ids, (err, result) => {
        if(err){
            res.status(500).json({ message: "Failed to mark item(s) as active!", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No matching items found to update" });
        }
        else{
            res.status(200).json({ message: "Item(s) marked active!" });
        }
    })
}

markDelete = (req, res) => {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Invalid or missing 'ids' in request body" });
    }
    var sql = "UPDATE to_do_items SET status = 'deleted' where id in (?)";
    db.query(sql, ids, (err, result) => {
        if(err){
            res.status(500).json({ message: "Failed to deleted item(s)!", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No matching items found to delete" });
        }
        else{
            res.status(200).json({ message: "Item(s) deleted!" });
        }
    })
}

module.exports = { editItem, markComplete, markActive, markDelete };