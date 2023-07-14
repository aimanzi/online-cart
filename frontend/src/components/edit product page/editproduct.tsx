import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../edit product page/editproduct.scss";
import icon from "../assets/icons/1409839.png";
import { NavDropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Loader from "../loader/loader";
import { useSelector } from "react-redux";

const EditProduct: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const EditProduct = useSelector(
    (state: any) => state.AllReducers.productinfo.product
  );

  let new_productname = useRef(EditProduct.productname);
  let new_productcategory = useRef(EditProduct.productcategory);
  let new_productbarcode = useRef(EditProduct.productbarcode);
  let new_productimg = useRef(EditProduct.productimg);
  let new_productPrice = useRef(EditProduct.productPrice);
  let new_note = useRef(EditProduct.note);

  const UpdataProduct = () => {
    setIsLoader(true);
    const ProducData = {
      productid: EditProduct._id,
      productname: new_productname.current.value,
      productcategory: new_productcategory.current.value,
      productbarcode: new_productbarcode.current.value,
      productimg: new_productimg.current.value,
      productPrice: new_productPrice.current.value,
      note: new_note.current.value,
    };
    const PostTodata = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin, ",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ProducData),
    };
    const fetching = async () => {
      await fetch("http://localhost:5000/updateproduct", PostTodata)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setMsg(data.message);
          setIsLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetching();
  };

  return (
    <div>
      <div>{isLoader ? <Loader /> : ""}</div>
      <NavDropdown className="edit-product-nav-container" title={"Menu"}>
        <DropdownItem>
          <Link to={"/startshopping"} style={{ textDecoration: "none" }}>
            Back
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
            Add product
          </Link>
        </DropdownItem>
      </NavDropdown>

      <div className="main-edit-product-contaier">
        <div className="inputs-main-container">
          <div className="input-container">
            <label>product name :</label>
            <input
              id="ProName"
              type="text"
              ref={new_productname}
              defaultValue={EditProduct.productname}
              className="productname"
              placeholder="product name"
              required
            />
          </div>
          <div className="input-container">
            <label>product category :</label>
            <input
              type="text"
              id="procategory"
              ref={new_productcategory}
              defaultValue={EditProduct.productcategory}
              className="productcategory"
              placeholder="product category"
              required
            />
          </div>
          <div className="input-container">
            <label>product barcode :</label>
            <input
              type="text"
              id="probarcode"
              ref={new_productbarcode}
              defaultValue={EditProduct.productbarcode}
              className="productbarcode"
              placeholder="product barcode"
              required
            />
          </div>
          <div className="input-container">
            <label>
              product Price in
              <img alt="shekel icon" src={icon} className="shekel-icon" />
            </label>
            <input
              type="text"
              ref={new_productPrice}
              id="proprice"
              defaultValue={EditProduct.productPrice}
              className="productPrice"
              placeholder="product Price"
              required
            />
          </div>
          <div className="input-container">
            <label>Note :</label>
            <input
              type="text"
              ref={new_note}
              id="note"
              defaultValue={EditProduct.note}
              placeholder="note"
              required
            />
          </div>

          <div className="input-container">
            <label>product image :</label>
            <input
              type="text"
              id="proimg"
              ref={new_productimg}
              defaultValue={EditProduct.productimg}
              className="productimg"
              placeholder="product img"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submitbtn" onClick={UpdataProduct}>
              Send Changes
            </button>
          </div>
          <div className="msg-container">
            <label>{msg}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
