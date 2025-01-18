const db = require("./db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sample for postman
/*
{
    "name": "tim",
    "password": "test",
    "group": "lim"
}
*/
registerUser = async(req, res) => {
    const { name, password, group } = req.body;
    if( !name || !password || !group){
        return res.status(400).json({ message: "All fields (name, password, group) are required!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    sql = "INSERT INTO to_do_users VALUES (?,?,?)";

    db.query(sql, [name, hashedPassword, group], (err) => {
        if(err){
            return res.status(400).json({ message: "Invalid user attributes", error: err.message});
        }
        else{
            return res.status(201).json({ message: "User registered successfully!"});
        }
    })
}

loginUser = (req, res) => {
    const { name, password } = req.body;
    if( !name || !password ){
        return res.status(400).json({ message: "All fields (name, password) are required!" });
    }
    var sql = "SELECT name, password, `group` from to_do_users where name = ?";
    db.query(sql, [name], async(err, result) => {
        if(err){
            return res.status(500).json({ message: "Database error.", error: err.message });
        }
        if(result.length === 0){
            return res.status(404).json({ message: "User not found!" });
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid password!" });
        }
        const token = jwt.sign(
            { name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        return res.status(200).json({ token: token, name: user.name, group: user.group });
    })

}

module.exports = { registerUser, loginUser };