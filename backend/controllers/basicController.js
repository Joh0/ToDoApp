const db = require('./db'); // import the connection from db.js


const getAllItemsByUser = (req, res) => {
    const name = req.params.name;
    var sql = "SELECT * from to_do_items where name = ?";
    db.query(sql, [name], (err, result) => {
        if(err){
            res.status(500).json({ message: 'Error reading from DB', error: err.message});
        }
        else{
            res.status(200).json({ data: result });
        }
    });
}


module.exports = { getAllItemsByUser };