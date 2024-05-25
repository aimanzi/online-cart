import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductInfoTyps from "../ProductInfoTyps";
import { addToCart, removeFromCart } from "../redux/reducer/userCart.mjs";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import "./productdisplay.scss";
import Loader from "../loader/loader";
import { editproduct } from "../redux/reducer/product.mjs";
// import {addItem, removeItem,  updateItem,  clearCart} from "../redux/reducer/usercart1.mjs";

const ProductDisplay: React.FC = () => {
  const [productinfo, setProductInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoader, setIsLoader] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.AllReducers.userdata.user);

  const removeClass = (
    classname: string,
    additionalClass: string,
    cartid: ProductInfoTyps
  ) => {
    const slectedProduct = document.querySelector(
      "#id" + cartid._id.toString()
    );
    const cartElement = slectedProduct?.querySelector("." + classname);
    if (cartElement) {
      cartElement.classList.remove(additionalClass);
    }
  };

  const addClass = (
    classname: string,
    additionalClass: string,
    cartid: ProductInfoTyps
  ) => {
    const slectedProduct = document.querySelector(
      "#id" + cartid._id.toString()
    );
    const cartElement = slectedProduct?.querySelector("." + classname);
    if (cartElement) {
      cartElement.classList.add(additionalClass);
    }
  };

  useEffect(() => {
    const fetching = async () => {
      await fetch("http://localhost:5000/product/productlist")
        .then((response) => response.json())
        .then((data) => {
          setProductInfo(data.products);
          setIsLoader(false);
        });
    };
    fetching();
    setRefresh(false);
  }, [refresh]);

  const AddToCart = (data: ProductInfoTyps) => {
    // dispatch(addItem({ id: data._id, name: data, quantity: 1 }));
    dispatch(addToCart(data));
    addClass("basket-icon", "show", data);
    addClass("add-btn-container", "hide", data);
    addClass("rmv-btn-container", "show", data);
  };

  const RemoveFromCart = (data: ProductInfoTyps) => {
    // dispatch(removeItem(data._id));
    dispatch(removeFromCart({ id: data._id }));
    removeClass("basket-icon", "show", data);
    removeClass("add-btn-container", "hide", data);
    removeClass("rmv-btn-container", "show", data);
  };

  const Deleteproduct = (data: ProductInfoTyps) => {
    const id = data._id;
    const DeleteData = {
      method: "DELETE",
      headers: {
        "Access-Control": "Allow-Origin",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    };

    const fetching = async () => {
      await fetch("http://localhost:5000/product/deleteproduct", DeleteData)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetching();
    handleRefresh();
  };

  const handleRefresh = () => {
    setRefresh(true);
  };

  const Editproduct = (data: ProductInfoTyps) => {
    dispatch(editproduct(data));
    navigate("/editproduct");
  };

  useEffect(() => {
    const ProductsCategory = productinfo.map(
      (product: any) => product.productcategory
    );
    const newCategoryfilter: any = Array.from(new Set(ProductsCategory));
    setCategory(newCategoryfilter);
  }, [productinfo]);

  const Search = () => {
    return productinfo.filter((item: any) => {
      return (
        item.productname.toLowerCase().includes(search.toLowerCase()) ||
        item.productcategory.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  return (
    <div className="main.product.container">
      <div>{isLoader ? <Loader /> : ""}</div>
      <div className="search-container">
        <div>
          <input
            type="search"
            className="search-input"
            onChange={(search) => setSearch(search.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
        <Dropdown className="dropdown-container">
          <NavDropdown className="dropdown" title={"Categories"}>
            {category.map((ctgry) => {
              return (
                <div key={ctgry}>
                  {ctgry ? (
                    <DropdownItem
                      onClick={() => {
                        setSearch(ctgry);
                      }}
                    >
                      {ctgry}
                    </DropdownItem>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </NavDropdown>
          <Button
            type="reset"
            className="reset-button"
            onClick={() => {
              setSearch("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </Button>
        </Dropdown>
      </div>
      <div className="grid-container">
        {Search().map((e: ProductInfoTyps) => {
          return (
            <Card key={e._id} id={"id" + e._id} className="card-container">
              <Card.Body className="grid-item">
                <Card.Header className="header">
                  <label>
                    Product Name
                    <div className="basket-icon">
                      <i className="bi bi-basket3-fill"></i>
                    </div>
                  </label>
                </Card.Header>
                <Card.Img
                  alt="productimg"
                  src={e.productimg}
                  className="img"
                ></Card.Img>
                <Card.Title className="card-title">
                  <label>{e.productname}</label>
                </Card.Title>
                <div className="card-subtitle">
                  <Card.Subtitle>
                    <label>Price :</label>
                    {e.productPrice} NIS
                  </Card.Subtitle>
                  <Card.Subtitle>
                    <label>Category : </label>
                    {e.productcategory}
                  </Card.Subtitle>
                  <Card.Subtitle>
                    <label>Barcode : </label>
                    {e.productbarcode}
                  </Card.Subtitle>
                  <Card.Subtitle>
                    <label>Note : </label>
                    {e.note}
                  </Card.Subtitle>
                </div>
                <div>
                  {user.role === "admin" ? (
                    ""
                  ) : (
                    <Card.Footer className="btn-group me-2">
                      <div className="add-btn-container">
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={() => {
                            AddToCart(e);
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="rmv-btn-container">
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={() => {
                            RemoveFromCart(e);
                          }}
                        >
                          Remove From Cart
                        </button>
                      </div>
                    </Card.Footer>
                  )}
                </div>
                <div>
                  {user.role === "admin" ? (
                    <Card.Footer className="btn-toolbar">
                      <div className="btn-group me-2">
                        <div>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              Editproduct(e);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => Deleteproduct(e)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </Card.Footer>
                  ) : (
                    ""
                  )}
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default ProductDisplay;
