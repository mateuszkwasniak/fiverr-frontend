import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Success.scss";

const Success = () => {
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateOrder = async () => {
      setError("");
      if (location) {
        const payment_intent = new URLSearchParams(location.search).get(
          "payment_intent"
        );
        if (!payment_intent) return;
        try {
          const response = await fetch(
            `https://fiverr-backend-xke3.onrender.com/api/order/update/${payment_intent}`,
            {
              method: "PUT",
              credentials: "include",
            }
          );
          if (!response.ok) {
            setError("Something went wrong during the booking process.");
            return;
          }
          setTimeout(() => {
            navigate("/orders");
          }, 5000);
        } catch (error) {
          setError("Something went wrong during the booking process.");
        }
      }
    };

    updateOrder();
  }, [location]);

  return (
    <div className="success">
      <h1>
        {error
          ? error
          : "Thank you for the order. Your payment was successful, please wait for it to be booked..."}
      </h1>
      <div className="spinner" />
    </div>
  );
};

export default Success;
