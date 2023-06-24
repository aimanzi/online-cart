import { useState } from "react";
import "./payment.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetdata } from "../redux/reducer/userCart.mjs";
import { useDispatch } from "react-redux";

const Payment: React.FC = () => {
  const [cardnumber, setCardNumber] = useState<string>("");
  const [carddate, setCardDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [paymentmsg, setPaymentMsg] = useState<string>("");
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userdata = useSelector((state: any) => state.AllReducers.userdata.user);
  const usercart = useSelector((state: any) => state.AllReducers.usercart.cart);

  const checkCreditCard = () => {
    let validation = [];
    let credit_card_number = new RegExp("^[0-9]{16}?$");
    let credit_card_date = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
    let cvv_number = new RegExp("^[0-9]{3}?$");

    if (credit_card_number.test(cardnumber)) {
      validation.push(true);
    } else {
      validation.push(false);
    }

    if (credit_card_date.test(carddate)) {
      validation.push(true);
    } else {
      validation.push(false);
    }

    if (cvv_number.test(cvv)) {
      validation.push(true);
    } else {
      validation.push(false);
    }

    const passing = validation.every((a) => a === true);
    if (passing) {
      SendingOrder();
    } else {
      setPaymentMsg("Payment Method's Details is Incorrect");
    }
  };

  const SendingOrder = () => {
    const clientOrder = {
      firstname: userdata.firstname,
      lastname: userdata.lastname,
      phonenumber: userdata.phonenumber,
      deilverydate: date,
      deilverytime: time,
      cart: usercart,
    };

    const orderData = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin, ",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientOrder),
    };

    const Fetching = () => {
      fetch("http://localhost:5000/order/clientorder", orderData)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data) {
            dispatch(resetdata([]));
            navigate("/endorder");
          }
        })
        .catch((err) => console.log(err));
    };
    Fetching();
  };

  return (
    <div className="main-card-container">
      <div className="inputs-container">
        <div className="inputs">
          <label>Delivery Date:</label>
          <input
            type={"date"}
            onChange={(date) => setDate(date.target.value)}
          />
        </div>
        <div className="inputs">
          <label>Delivery Time:</label>
          <input
            type={"time"}
            onChange={(time) => setTime(time.target.value)}
          />
        </div>

        <div className="inputs">
          <label>Credit Card Number : </label>
          <input
            type={"password"}
            size={16}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="0000 0000 0000 0000"
          ></input>
        </div>
        <div className="inputs">
          <label>Credit Card Validity : </label>
          <input
            type={"text"}
            size={4}
            onChange={(e) => setCardDate(e.target.value)}
            placeholder="MM/YY"
          ></input>
        </div>
        <div className="inputs">
          <label>Credit Card Cvv : </label>
          <input
            type={"password"}
            size={3}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="3 digits"
          ></input>
        </div>
      </div>
      <div className="check-button-container">
        {carddate && carddate && cvv && date && time ? (
          <button className="send-button" onClick={checkCreditCard}>
            Send Order
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="msg-container">
        <p>{paymentmsg}</p>
      </div>
    </div>
  );
};

export default Payment;
