const db = require('./db'); // import the connection from db.js

// Use this for postman
// http://localhost:3000/api/listName/tim?sortColumn=id&sortOrder=DESC&status=active&category=household


const getAllItemsByUser = (req, res) => {
    const name = req.params.name;
    const sortColumn = req.query.sortColumn || 'id';
    const sortOrder = req.query.sortOrder || 'ASC';
    const status = req.query.status;
    const category = req.query.category;
    if(!['ASC','DESC'].includes(sortOrder)){
        return res.status(400).json({ message: "Invalid sort order"});
    }
    var sql = "SELECT * from to_do_items where `name` = ?";
    var queryParam = [name];
    if(status){
        sql += " AND status = ?";
        queryParam.push(status);
    }
    if(category){
        sql += " AND category = ?";
        queryParam.push(category);
    }
    else{
        sql += " AND status in ('active', 'completed')";
    }
    sql += " ORDER BY ??" + sortOrder;
    queryParam.push(sortColumn);
    db.query(sql, queryParam, (err, result) => {
        if(err){
            res.status(404).json({ message: 'Error reading from DB', error: err.message});
        }
        else{
            res.status(200).json({ data: result });
        }
    });
}

// Use this for postman
// http://localhost:3000/api/listGroup/lim?sortColumn=id&sortOrder=DESC&status=active&category=household

const getAllItemsByUserGroup = (req, res) => {
    const group = req.params.group;
    const sortColumn = req.query.sortColumn || 'id';
    const sortOrder = req.query.sortOrder || 'ASC';
    const status = req.query.status;
    const category = req.query.category;
    if(!['ASC','DESC'].includes(sortOrder)){
        return res.status(400).json({ message: "Invalid sort order"});
    }
    var sql = "SELECT * from to_do_items where `group` = ?";
    var queryParam = [group];
    if(status){
        sql += " AND status = ?";
        queryParam.push(status);
    }
    if(category){
        sql += " AND category = ?";
        queryParam.push(category);
    }
    else{
        sql += " AND status in ('active', 'completed')";
    }
    sql += " ORDER BY ??" + sortOrder;
    queryParam.push(sortColumn);
    db.query(sql, queryParam, (err, result) => {
        if(err){
            res.status(404).json({ message: 'Error reading from DB', error: err.message});
        }
        else{
            res.status(200).json({ data: result });
        }
    });
}

// Use this for postman
// http://localhost:3000/api/listNameDeleted/tim

const getAllDeletedItemsByUser = (req, res) => {
    const name = req.params.name;
    var sql = "SELECT * from to_do_items where `name` = ? and status = 'deleted'";
    db.query(sql, [name], (err, result) => {
        console.log("Retrieving deleted items of " + name);
        if(err){
            res.status(404).json({ message: 'Error reading from DB', error: err.message});
        }
        else{
            res.status(200).json({ data: result });
        }
    });
}

module.exports = { getAllItemsByUser, getAllItemsByUserGroup, getAllDeletedItemsByUser };