import React, { useEffect } from "react";
import "./PaymentSuccess.scss";
import successIcon from "../../../public/img/success-icon.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
function PaymentSuccess() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  // console.log(search)
  // console.log(params)
  // console.log(payment_intent)

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put(`/orders`, { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="payment-success">
      <img src={successIcon} alt="Success Icon" className="success-icon" />
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p>
        Don't do anything you'll be redirected to your{" "}
        <strong> order page!</strong>
      </p>
    </div>
  );
}

export default PaymentSuccess;
