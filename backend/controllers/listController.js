const db = require('./db'); // import the connection from db.js

// Use this for postman
// http://localhost:3000/api/listGroup/lim?sortColumn=id&sortOrder=DESC


const getAllItemsByUser = (req, res) => {
    const name = req.params.name;
    const sortColumn = req.query.sortColumn;
    const sortOrder = req.query.sortOrder;
    if(!['ASC','DESC'].includes(sortOrder)){
        return res.status(400).json({ message: "Invalid sort order"});
    }
    var sql = "SELECT * from to_do_items where `name` = ? and status in ('active', 'completed') order by ??" + sortOrder;
    db.query(sql, [name, sortColumn], (err, result) => {
        if(err){
            res.status(500).json({ message: 'Error reading from DB', error: err.message});
        }
        else{
            res.status(200).json({ data: result });
        }
    });
}

const getAllItemsByUserGroup = (req, res) => {
    const group = req.params.group;
    const sortColumn = req.query.sortColumn;
    const sortOrder = req.query.sortOrder;
    if(!['ASC','DESC'].includes(sortOrder)){
        return res.status(400).json({ message: "Invalid sort order"});
    }
    var sql = "SELECT * from to_do_items where `group` = ? and status in ('active', 'completed') order by ??" + sortOrder;
    db.query(sql, [group, sortColumn], (err, result) => {
        if(err){
            res.status(500).json({ message: 'Error reading from DB', error: err.message});
        }
        else{
            res.status(200).json({ data: result });
        }
    });
}

module.exports = { getAllItemsByUser, getAllItemsByUserGroup };