const express = require('express'); // All of these you have to 'npm install xxx' at the base path
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllItemsByUser, getAllItemsByUserGroup } = require('./controllers/listController');

const app = express();


app.use(bodyParser.json());
app.use(cors());

// All the apis
app.get("/api/listName/:name", getAllItemsByUser);
app.get("/api/listGroup/:group", getAllItemsByUserGroup);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})