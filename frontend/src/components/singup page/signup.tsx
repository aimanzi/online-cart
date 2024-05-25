import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signup.scss";
import Footer from "../footer/footer";
import Loader from "../loader/loader";

const SignUp: React.FC = () => {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setconFirmPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phonenumber, setPhoneNumber] = useState<string>("");
  const [fnamemsg, setFnameMsg] = useState<string>("");
  const [lnamemsg, setLnameMsg] = useState<string>("");
  const [idmsg, setIdMsg] = useState<string>("");
  const [mailmsg, setMailMsg] = useState<string>("");
  const [passwordmsg, setPasswordMsg] = useState<string>("");
  const [confirmpasswordmsg, setPasswordConfirm] = useState<string>("");
  const [generalmsg, setGneralMsg] = useState<string>("");
  const [resmsg, setResMsg] = useState("");
  const [isUpdating, setUpdating] = useState(false);

  function clearInputs() {
    setTimeout(() => {
      setFirstName("");
      setLastName("");
      setId("");
      setMail("");
      setPassword("");
      setconFirmPassword("");
      setCity("");
      setAddress("");
      setPhoneNumber("");
      setResMsg("");
    }, 2000);
  }

  const removeClassname = (id: string, classname: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.remove(classname);
    }
  };

  const addClassname = (id: string, classname: string) => {
    const element = document.getElementById(id);
    if (element) {
      element?.classList.add(classname);
    }
  };

  //----------------------------step1 valeidation------------------------------------------------------------------------------------------------------------------------------------------//

  const setp1Validation = () => {
    let fnamestatus: boolean;
    let lnamestatus: boolean;
    let idstatus: boolean;

    const fname = new RegExp(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/);
    if (fname.test(firstname)) {
      fnamestatus = true;
      setFnameMsg("");
    } else {
      fnamestatus = false;
      setFnameMsg("Invalid/missing First Name");
      setFirstName("");
    }

    const lname = new RegExp(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/);
    if (lname.test(lastname)) {
      lnamestatus = true;
      setLnameMsg("");
    } else {
      lnamestatus = false;
      setLnameMsg("Invalid/missing Last Name");
      setLastName("");
    }

    let sum: number = 0;
    let Id = [];
    Id = Array.from(String(id), Number);
    let idnumber = [];
    let valuenumber = [1, 2, 1, 2, 1, 2, 1, 2];

    for (let i = 0; i < 8; i++) {
      idnumber[i] = Id[i] * valuenumber[i]; // קליטת מספר זהות והכפלתו
    }

    for (let i = 0; i < idnumber.length; i++) {
      if (idnumber[i] < 10) {
        sum = sum + idnumber[i];
      } else {
        sum = sum + 1 + (idnumber[i] % 10); // חילוק בשארית ולהוסי 1 מכיוון המספרים נעים בין 10-19
      }
    }

    let checkdigit = sum + Id[8];
    if (checkdigit % 10 === 0) {
      //בדיקת התאמת ספרת ביקורת
      idstatus = true;
      setIdMsg("");
    } else {
      idstatus = false;
      setIdMsg("invalid/missing ID number");
      setId("");
    }

    if (fnamestatus === true && lnamestatus === true && idstatus === true) {
      removeClassname("step2", "nextstep");
      removeClassname("setp1-err-msg", "errmsg");
      // addClassname("", "");
    } else {
      addClassname("setp1-err-msg", "errmsg");
    }
  };

  //-----------------------------step2 valeidation-----------------------------------------------------------------------------------------------------------------------------------------------//

  const step2Valeidation = () => {
    let mailstatus: boolean;
    let passwordstatus: boolean;
    let passwordconfirmStatus: boolean;

    const Emailregex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (Emailregex.test(mail)) {
      mailstatus = true;
    } else {
      mailstatus = false;
      setMailMsg("invalid/missing mail");
      setMail("");
    }

    const Passwordregex = new RegExp(/^(?!.*[#!])(?=.*[A-Z])(?=.*[0-9]).{8,}$/);
    if (Passwordregex.test(password)) {
      passwordstatus = true;
    } else {
      passwordstatus = false;
      setPasswordMsg("invalid/missing password");
      setPassword("");
      setconFirmPassword("");
    }

    if (confirmpassword === password) {
      passwordconfirmStatus = true;
    } else {
      passwordconfirmStatus = false;
      setPasswordConfirm("dismatch/missing password");
      setconFirmPassword("");
    }

    if (
      mailstatus === true &&
      passwordconfirmStatus === true &&
      passwordstatus === true
    ) {
      removeClassname("step3", "nextstep");
      removeClassname("setp2-err-msg", "errmsg");
    } else {
      addClassname("setp2-err-msg", "errmsg");
    }
  };

  const UserSignUp = () => {
    setUpdating(true);
    const signup_data = {
      firstname,
      lastname,
      id,
      mail,
      password,
      city,
      address,
      phonenumber,
    };

    const postSignUpData = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin, ",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signup_data),
    };

    const fetching = async () => {
      await fetch("http://localhost:5000/signup", postSignUpData)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUpdating(false);
            setResMsg(data.message);
            clearInputs();
          }
        })
        .catch((err) => console.log(err));
    };
    fetching();
  };

  useEffect(() => {
    var element = document.getElementById("1");
    element?.addEventListener("mouseover", () => {
      removeClassname("gnrmsg", "remove");
      setGneralMsg("Use Only Letters For Fist And Last Name");
    });
    element?.addEventListener("mouseleave", () => {
      addClassname("gnrmsg", "remove");
    });

    var element1 = document.getElementById("2");
    element1?.addEventListener("mouseover", () => {
      removeClassname("gnrmsg", "remove");
      setGneralMsg(
        "The Password Must Contain At Lest 8 Character One ,UperCase Lettet ,Number And Special Character"
      );
    });
    element1?.addEventListener("mouseleave", () => {
      addClassname("gnrmsg", "remove");
    });

    var element2 = document.getElementById("3");
    element2?.addEventListener("mouseover", () => {
      removeClassname("gnrmsg", "remove");
      setGneralMsg("");
    });
    element2?.addEventListener("mouseleave", () => {
      addClassname("gnrmsg", "remove");
    });
  });

  //-----------------------------------------------------------------------------------------------//

  return (
    <div className="main-signup-div">
      {isUpdating ? <Loader /> : ""}
      <nav className="signup-nav-container">
        <div className="dropdown">
          <button type="button" className="dropbtn">
            Menu
          </button>
          <div className="dropdown-content">
            <Link to={"/login"}>
              <i className="bi bi-box-arrow-in-right"></i>
              Login Page
            </Link>
            <Link to={"/"}>
              <i className="bi bi-house"></i>
              Home Page
            </Link>
          </div>
        </div>
      </nav>

      <div className="signup-main-container">
        <div className="generalmsg-container" id="gnrmsg">
          <h6>{generalmsg}</h6>
        </div>
        <div className="signup-container" id="step1">
          <div className="signup-input-container" id="1">
            <label>First Name : </label>
            <input
              id="fname"
              type="text"
              value={firstname}
              placeholder=" first name"
              spellCheck="true"
              onChange={(fname) => setFirstName(fname.target.value)}
              required
            />
          </div>
          <div className="signup-input-container">
            <label>Last Name : </label>
            <input
              id="lname"
              type="text"
              value={lastname}
              placeholder="last name"
              onChange={(lname) => setLastName(lname.target.value)}
              required
            />
          </div>
          <div className="signup-input-container">
            <label>Id Number : </label>
            <input
              id="idnum"
              type="number"
              value={id}
              placeholder="id number"
              onChange={(id) => setId(id.target.value)}
              required
            />
          </div>
          {firstname && lastname && id ? (
            <div>
              <button
                type="button"
                className="signup-button"
                id="nextbutton"
                onClick={() => {
                  setp1Validation();
                  addClassname("nextbutton", "remove");
                }}
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="errormsg" id="setp1-err-msg">
            <h6>{fnamemsg}</h6>
            <h6>{lnamemsg}</h6>
            <h6>{idmsg}</h6>
          </div>
        </div>

        <div className="signup-container nextstep" id="step2">
          <div className="signup-input-container" id="2">
            <label>Email : </label>
            <input
              type="email"
              value={mail}
              placeholder="mail address"
              onChange={(mail) => setMail(mail.target.value)}
              required
            />
          </div>
          <div className="signup-input-container">
            <label>Password : </label>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(password) => setPassword(password.target.value)}
              required
            />
          </div>
          <div className="signup-input-container">
            <label>Confirm Password : </label>
            <input
              type="password"
              value={confirmpassword}
              placeholder="password"
              onChange={(password) => setconFirmPassword(password.target.value)}
              required
            />
          </div>
          {mail && password && confirmpassword ? (
            <div>
              <button
                type="button"
                id="nextbutton1"
                className="signup-button"
                onClick={() => {
                  step2Valeidation();
                  addClassname("nextbutton1", "remove");
                }}
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="errormsg " id="setp2-err-msg">
            <h6>{mailmsg}</h6>
            <h6>{passwordmsg}</h6>
            <h6>{confirmpasswordmsg}</h6>
          </div>
        </div>

        <div className="signup-container nextstep" id="step3">
          <div className="signup-input-container" id="3">
            <label>City : </label>
            <input
              type="text"
              value={city}
              placeholder="city name"
              onChange={(cname) => setCity(cname.target.value)}
              required
            />
          </div>
          <div className="signup-input-container">
            <label>Address : </label>
            <input
              type="text"
              value={address}
              placeholder="home address"
              onChange={(haddress) => setAddress(haddress.target.value)}
              required
            />
          </div>
          <div className="signup-input-container">
            <label>Phone Number : </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{3}-[0-9]{7}"
              onChange={(pnumber) => setPhoneNumber(pnumber.target.value)}
              placeholder="123-4567890"
              required
            ></input>
          </div>
          {city && address && phonenumber ? (
            <div className="signup-button-container">
              <button
                type="submit"
                className="signup-button"
                onClick={UserSignUp}
              >
                Sbumit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="resmsg">
          <h6>{resmsg}</h6>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
