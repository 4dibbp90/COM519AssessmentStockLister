
const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
{
    productid: Number,
    name: String,
    description: String,
    brand: String,
    colour: String,
    price: Number,
    quantity: Number

},
{ timestamps: true }
);
module.exports = mongoose.model("products", productSchema);