import ProductSchema from "../model/product.mjs";

function DisplayProduct(req, res) {
  console.log("Get Product Informaton From DataBase");
  const productInfo = ProductSchema;
  let productcategory = req.body.catagory;
  productInfo
    .find()
    .sort({ productcategory })
    .then((result) => {
      console.log("Downloading Products Completed");
      res.json({
        message: "Downloading Products Completed ",
        success: true,
        products: result,
      });
    })
    .catch((err) => console.log(err));
}

function AddProductInfo(req, res) {
  console.log("posting product info");
  const productdata = req.body;
  console.log(productdata);
  if (productdata === "") {
    console.log("product info list is empty");
    res.json({
      message: "product info added to database",
      succsess: false,
    });
  } else {
    const addproduct = ProductSchema;
    addproduct
      .insertMany(productdata)
      .then((result) => {
        if (result) {
          console.log("product info added to database");
          res.json({
            message: "product info added to database",
            succsess: true,
            productinfo: result,
          });
        }
      })
      .catch(() =>
        res.json({
          message: "product info added to database failed",
          succsess: false,
        })
      );
  }
}

function DeleteProduct(req, res) {
  console.log("**deleting product from DataBase**");
  let _id = req.body.id;
  let product = ProductSchema;

  if (_id == "") {
    console.log("product ID is missing ot empty");
    res.json({ message: "vproduct ID is missing ot empty", success: false });
  } else {
    product
      .findByIdAndDelete({ _id })
      .then((result) => {
        if (result) {
          console.log("Delleting Product success");
          res.json({
            message: "Delleting Product success ",
            success: true,
          });
        } else {
          console.log("Delleting Product Failed");
          res.json({
            message: "Delleting Product Failed",
            success: false,
          });
        }
      })
      .catch(() => res.json({ message: "Deleting Failed", success: false }));
  }
}

function UpdateProduct(req, res) {
  console.log("Update product Data ");
  let product = ProductSchema;
  let id = req.body.productid;
  let productname = req.body.productname;
  let productcategory = req.body.productcategory;
  let productbarcode = req.body.productbarcode;
  let productimg = req.body.productimg;
  let productPrice = req.body.productPrice;
  let note = req.body.note;

  if (
    productname === "" ||
    productcategory === "" ||
    productbarcode === "" ||
    productimg === "" ||
    productPrice === "" ||
    note === ""
  ) {
    console.log("some product information is missing/empty");
    res.json({
      message: "some product information is missing/empty ",
      success: false,
    });
  } else {
    let new_data_obj = {
      productname,
      productcategory,
      productbarcode,
      productimg,
      productPrice,
      note,
    };

    product
      .findByIdAndUpdate({ _id: id }, { $set: new_data_obj }, { new: true })
      .then((result) => {
        if (result) {
          console.log("Data Update Succsess");
          res.json({
            message: "Data Update Succsess ",
            success: true,
            result: productdata,
          });
        } else {
          console.log("Data Update Failed");
          res.json({ message: "Data Update Failed ", success: false });
        }
      })
      .catch(() => res.json({ message: "Updating Failed", success: false }));
  }
}

export default { AddProductInfo, DisplayProduct, DeleteProduct, UpdateProduct };
