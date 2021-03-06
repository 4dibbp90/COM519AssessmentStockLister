const products = require("../models/ListProducts");

// list1
  exports.list = async (req, res) => {
    try {
      const list = await products.find({});
      res.render("listProducts", { list: list});
    } catch (e) {
      res.status(404).send({ message: "could not list products" });
    }
  } 

  //in stock list
  exports.instocklist = async (req, res) => {
    
      const list = await products.find({ "quantity": { $gt: 0 } });
      res.render("inStock", { list: list});
      
   //delete
  };
  exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
      await products.findByIdAndRemove(id);
      res.redirect("/listproducts");
    } catch (e) {
      res.status(404).send({
        message: `could not delete  record ${id}.`,
      });
    }
  };

  exports.create = async (req, res) =>{
    let product = new products({productid: req.body.productid, name: req.body.name, description: req.body.description, brand: req.body.brand, colour: req.body.colour, price: req.body.price, quantity: req.body.quantity});
    try{
    
    await product.save();
    res.redirect('/listProducts')
    }catch (e) {
      return res.status(400).send({
      message: "create failed"
    });}}

  //get to modify
  
  exports.get = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await products.findById(id);
      res.render('modifyProduct', { product: product, id: id });
    } catch (e) {
      res.status(404).send({
        message: `could not find product ${id}.`,
      });
    }
  };
  
  //save changes
  exports.modify = async (req, res) =>{
  const id = req.params.id;
  try{
  //const product = await products.updateOne({ id: id }, req.body);
  const product = await products.updateOne({ id: id }, {productid: req.body.productid, name: req.body.name, description: req.body.description, brand: req.body.brand, colour: req.body.colour, price: req.body.price, quantity: req.body.quantity});
  res.redirect('/listProducts/');
} catch (e) {
  res.status(404).send({
    message: `could find product${id}.`
  });
}
};





