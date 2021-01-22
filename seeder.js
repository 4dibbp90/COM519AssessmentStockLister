const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");


//const uri = "mongodb://localhost:27017/productList";
const uri ="mongodb+srv://admin:admin@cluster0.rlyz7.mongodb.net/productlist?retryWrites=true&w=majority"
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("products").find({}).count();

    /**
     * If existing records then delete the current collections
     */
    if (results) {
      db.dropDatabase();
    }

    /**
     * This is just a fun little loader module that displays a spinner
     * to the command line
     */
    const load = loading("importing your products!!").start();

    /**
     * Import the JSON data into the database
     */

    const data = await fs.readFile(path.join(__dirname, "productlist.json"), "utf8");
    await db.collection("products").insertMany(JSON.parse(data));


    load.stop();
    console.info(
      'product collection set up!');


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();