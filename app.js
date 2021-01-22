

require("dotenv").config();
const express = require("express");

//const port = 3000;
const mongoose = require("mongoose");
const { PORT, MONGODB_URI } = process.env;

const app = express();
app.set("view engine", "ejs");
app.get("/", (req, res) =>{
res.render("index.ejs");});
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
console.log(process.env.PORT);
//mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//const { WEB_PORT, MONGODB_URI } = process.env;



//app.get("/inStock", (req, res) => {res.render ("inStock")});



const dataController = require("./controllers/listProducts");
app.get("/listProducts", dataController.list);
app.get("/listProducts/delete/:id", dataController.delete);
app.get("/inStock", dataController.instocklist);
app.get("/inStock/delete/:id", dataController.delete);
app.get("/inStock/get/:id", dataController.instocklist);
app.get("/listProducts/get/:id", dataController.get);

app.get("/createProduct", (req, res) => {res.render ("createProduct")});
app.post("/createProduct", dataController.create);
app.get("/createProduct/create", dataController.create);


app.get("/modifyProduct/get/:id", dataController.get);
app.post("/modifyProduct/modify/:id", dataController.modify);
app.post("/modifyProduct", dataController.modify);


mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
  );
  process.exit();
});


app.listen(port, () =>{
    console.log(`app listening at http://localhost:${PORT}`);
});