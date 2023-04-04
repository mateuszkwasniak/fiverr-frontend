import React from "react";
import "./Orders.scss";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, isError, data, refetch, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch(
        "https://fiverr-backend-xke3.onrender.com/api/order",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      return await response.json();
    },
  });

  const handleContact = async (secondUserId) => {
    const response = await fetch(
      `https://fiverr-backend-xke3.onrender.com/api/conversation/init/${secondUserId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      return;
    } else {
      const data = await response.json();
      navigate(`/message/${data.conversation._id}`);
    }
  };

  return (
    <div className="orders">
      {isLoading && "Loading..."}
      {isError && error.message}
      {data && (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
            <Link to="">
              <button>Add New Gig</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>{currUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img
                      className="img"
                      src={
                        order.gig.cover ||
                        "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      }
                      alt="it"
                    />
                  </td>
                  <td>{order.gig.title}</td>
                  <td>{order.gig.price}</td>
                  <td>
                    {currUser.isSeller
                      ? order.orderedBy.username
                      : order.gig.owner.username}
                  </td>
                  <td>
                    <img
                      src="/img/message.png"
                      alt="message"
                      className="delete"
                      onClick={() => {
                        handleContact(
                          currUser.isSeller
                            ? order.orderedBy._id
                            : order.gig.owner._id
                        );
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
