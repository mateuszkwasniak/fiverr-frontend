import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./CheckoutForm.scss";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://fiver-like.netlify.app/success",
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
        setIsLoading(false);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <form className="checkoutForm" onSubmit={handleSubmit}>
      <PaymentElement
        className="paymentElement"
        options={paymentElementOptions}
      />
      <button disabled={isLoading || !stripe || !elements} type="submit">
        <span>{isLoading ? <div className="spinner" /> : "Pay now"}</span>
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
