const db = require("./db");

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

module.exports = { editItem };