const express = require('express'); // All of these you have to 'npm install xxx' at the base path
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllItemsByUser, getAllItemsByUserGroup, getAllDeletedItemsByUser } = require('./controllers/listController');
const { addItem } = require('./controllers/addController');
const { editItem, markComplete, markActive, markDelete } = require('./controllers/editController');
const { deleteItem } = require('./controllers/deleteController');

const app = express();


app.use(bodyParser.json());
app.use(cors());

// All the apis
app.get("/api/listName/:name", getAllItemsByUser);
app.get("/api/listGroup/:group", getAllItemsByUserGroup);
app.get("/api/listNameDeleted/:name", getAllDeletedItemsByUser);
app.post("/api/add", addItem);
app.put("/api/edit", editItem);
app.put("/api/markComplete", markComplete);
app.put("/api/markActive", markActive);
app.put("/api/markDelete", markDelete);
app.delete("/api/delete", deleteItem);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})