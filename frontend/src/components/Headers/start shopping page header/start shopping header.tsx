import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./start shopping header.scss";
import { useSelector } from "react-redux";

const StartShoppingHeader: React.FC = () => {
  const [cartlenght, setCartLenght] = useState<number>(0);
  const user = useSelector((state: any) => state.AllReducers.userdata.user);
  const usercart = useSelector((state: any) => state.AllReducers.usercart.cart);
  const cartLen = usercart.length;

  useEffect(() => {
    setCartLenght(cartLen);
  }, [usercart]);

  const navigate = useNavigate();
  const LogOut = () => {
    fetch("http://localhost:5000/disconnect", {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  return (
    <div>
      <nav>
        <div className="start-shopping-header">
          <div className="name-container">
            <label>
              Hello {user.firstname} {user.lastname}
            </label>
          </div>
          <div>
            {user.role === "admin" ? (
              <div>
                <Link to={"/addproduct"}>
                  <button type="button" className="main-button">
                    Add Product
                  </button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {user.role === "admin" ? (
              ""
            ) : (
              <div className="cart-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  fill="currentColor"
                  className="bi bi-cart4"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                <label>{cartlenght}</label>
              </div>
            )}
          </div>
          <div>
            {user.role === "admin" ? (
              ""
            ) : (
              <div>
                <Link to={"/mainshopping"}>
                  <button type="button" className="main-button">
                    Back
                  </button>
                </Link>

                <Link to={"/checkout"}>
                  <button type="button" className="main-button">
                    Checkout
                  </button>
                </Link>
              </div>
            )}
          </div>
          <button type="button" className="main-button" onClick={LogOut}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default StartShoppingHeader;

// const user = useSelector((state: any) => state.AllReducers.userdata.data)
