import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Payment.scss";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API);

const Payment = () => {
  const { gigId } = useParams();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "##1dbf73",
      colorBackground: "#f1fdf7",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          `https://fiverr-backend-xke3.onrender.com/api/order/${gigId}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        const data = await response.json();
        if (!response.ok) {
          setError(data.error);
        } else {
          setClientSecret(data.payment_intent);
        }
      } catch (error) {
        setError("Something went wrong, please try again later.");
      }
    };

    createPaymentIntent();
  }, []);

  return (
    <div className="payment">
      {error && error}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
