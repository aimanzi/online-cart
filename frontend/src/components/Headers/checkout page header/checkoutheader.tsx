import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../checkout page header/checkoutheader.scss";
import { useSelector } from "react-redux";

const CheckoutHeader: React.FC = () => {
  const user = useSelector((state: any) => state.AllReducers.userdata.user);

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
        <div className="checkout-shopping-header">
          <div className="name-container">
            <label>
              Hello {user.firstname} {user.lastname}
            </label>
          </div>
          <div>
            <Link to={"/startshopping"}>
              <button type="button" className="main-button">
                Back
              </button>
            </Link>
            <Link to={"/"}>
              <button type="button" className="main-button" onClick={LogOut}>
                Logout
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CheckoutHeader;
