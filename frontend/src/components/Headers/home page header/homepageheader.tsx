import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./StartShoppingHeader.scss";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const LogIn = async () => {
    navigate("/login");
    await fetch("http://localhost:5000/connecting", {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin, ",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const SignUp = async () => {
    navigate("/signup");
    await fetch("http://localhost:5000/connecting", {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin, ",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <nav>
      <div className="header-main-contanier">
        <div className="button-contanier">
          <button type="button" className="main-button" onClick={LogIn}>
            Login
          </button>
          <button type="button" className="main-button" onClick={SignUp}>
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
