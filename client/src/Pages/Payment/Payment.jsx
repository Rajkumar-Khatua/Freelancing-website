import "./Payment.scss";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckOutForm from "../../components/CheckOutForm/CheckOutForm";
import { CircularProgress } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51N8ixqSJRuBcsSqBXSWzTYkjTEXYimWeMAvInXA6fzOXVaBDRppl0HRthcGDKr3Uj11NJqGaUbvrfFcjaUIF1xDD00w99ve5LB"
);

function Payment() {
  const { id } = useParams();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#2ec27e",
      colorBackground: "#f6f5f4",
      colorText: "#241f31",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Payment">
      <h1 className="payment-page__heading">Payment Page</h1>
      {loading ? (
        <CircularProgress size={100} thickness={1} color="inherit" />
      ) : (
        clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        )
      )}
    </div>
  );
}

export default Payment;
