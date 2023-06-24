import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./addproduct.scss";
import Footer from "../footer/footer";
import icon from "../assets/icons/1409839.png";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { addproduct } from "../redux/reducer/product.mjs";
import Loader1 from "../loader/loader1";

const AddProduct: React.FC = () => {
  const [productname, setProductName] = useState<string>("");
  const [productcategory, setProductCategory] = useState<string>("");
  const [productbarcode, setProductBarcode] = useState<string>("");
  const [productimg, setProdusctImg] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isLoder, setIsLoder] = useState(false);
  const [msg, setMsg] = useState("");

  const AddProductInfo = () => {
    if (
      productname === "" ||
      productcategory === "" ||
      productcategory === "" ||
      productimg === "" ||
      productPrice === "" ||
      note === ""
    ) {
      console.log("Some Product Information Is Missing");
    } else {
      addProduct();
    }
  };

  const addProduct = () => {
    setIsLoder(true);
    const ProducData = {
      productname,
      productcategory,
      productbarcode,
      productimg,
      productPrice,
      note,
    };
    const PostTodata = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ProducData),
    };
    const fetching = async () => {
      await fetch("http://localhost:5000/product/addproductinfo", PostTodata)
        .then((response) => response.json())
        .then((data) => {
          setMsg(data.message);
          setIsLoder(false);
          ClearInputs();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetching();
  };

  const ClearInputs = () => {
    setNote("");
    setProductBarcode("");
    setProductCategory("");
    setProductName("");
    setProductPrice("");
    setProdusctImg("");
  };

  return (
    <div>
      {isLoder ? <Loader1 /> : ""}
      <NavDropdown className="edit-product-nav-container" title={"Menu"}>
        <DropdownItem>
          <Link to={"/startshopping"} style={{ textDecoration: "none" }}>
            Back
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to={"/editproduct"} style={{ textDecoration: "none" }}>
            Edit product
          </Link>
        </DropdownItem>
      </NavDropdown>

      <div className="main-addproduct-contaier">
        <div className="inputs-main-container">
          <div className="input-container">
            <label>product name :</label>
            <input
              type="text"
              value={productname}
              className="productname"
              placeholder="product name"
              onChange={(proname) => setProductName(proname.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>product category :</label>
            <input
              type="text"
              value={productcategory}
              className="productcategory"
              placeholder="product category"
              onChange={(prcategory) =>
                setProductCategory(prcategory.target.value)
              }
              required
            />
          </div>
          <div className="input-container">
            <label>product barcode :</label>
            <input
              type="text"
              value={productbarcode}
              className="productbarcode"
              placeholder="product barcode"
              onChange={(probarcode) =>
                setProductBarcode(probarcode.target.value)
              }
              required
            />
          </div>
          <div className="input-container">
            <label>
              product Price in
              <img alt="shekel icon" src={icon} className="shekel-icon" />:{" "}
            </label>
            <input
              type="text"
              value={productPrice}
              className="productPrice"
              placeholder="product Price"
              onChange={(proprice) => setProductPrice(proprice.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Note :</label>
            <input
              type="text"
              value={note}
              className="note"
              placeholder="note"
              onChange={(pronote) => setNote(pronote.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label>product image :</label>
            <input
              type="text"
              value={productimg}
              className="productimg"
              placeholder="product img"
              onChange={(proimg) => setProdusctImg(proimg.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button
              type="submit"
              className="submitbtn"
              onClick={AddProductInfo}
            >
              Add Product
            </button>
          </div>
          <div>
            <label>{msg}</label>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AddProduct;
