const products = require("../models/ListProducts");


exports.list = async (req, res) => {
    try {
      const list = await products.find({});
      res.render("listProducts", { list: list});
    } catch (e) {
      res.status(404).send({ message: "could not list tasters" });
    }
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

exports.create =  async (req, res) =>{
   let product = new product({productid: req.body.productid, name: req.body.name, description: PermissionRequest.body.description, brand: req.body.brand, colour: req.body.colour, price: req.body.price, quantity: req.body.quantity});
   await product.save();
   res.redirect('/listProducts')
}
  