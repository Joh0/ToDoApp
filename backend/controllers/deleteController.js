const db = require("./db");

deleteItem = (req, res) => {
    const id = req.query.id;
    sql = "DELETE FROM to_do_items WHERE status = 'deleted' and id = ?";
    db.query(sql, [id], (err, result) => {
        if(err){
            return res.status(500).json({ message: "Failed to delete item!", error: err.message })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No matching item found to delete" });
        }
        else{
            res.status(200).json({ message: "Item deleted!" });
        }
    })
}

deleteItems = (req, res) => {
    const ids = req.body.ids;
    sql = "DELETE FROM to_do_items WHERE status = 'deleted' and id in (?)";
    db.query(sql, [ids], (err, result) => {
        if(err){
            return res.status(500).json({ message: "Failed to delete item!", error: err.message })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No matching item found to delete" });
        }
        else{
            res.status(200).json({ message: "Item deleted!" });
        }
    })
}

module.exports = { deleteItem };