const express = require('express'); // All of these you have to 'npm install xxx' at the base path
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllItemsByUser, getAllItemsByUserGroup } = require('./controllers/listController');
const { addItem } = require('./controllers/addController');
const { editItem } = require('./controllers/editController');

const app = express();


app.use(bodyParser.json());
app.use(cors());

// All the apis
app.get("/api/listName/:name", getAllItemsByUser);
app.get("/api/listGroup/:group", getAllItemsByUserGroup);
app.post("/api/add", addItem);
app.put("/api/edit", editItem);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})