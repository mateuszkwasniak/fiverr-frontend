import React from "react";
import "./Messages.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const Messages = () => {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const response = await fetch(
        "https://fiverr-backend-xke3.onrender.com/api/conversation/all",
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

  const markReadMutation = useMutation({
    mutationFn: (conversationId) => {
      return fetch(
        `https://fiverr-backend-xke3.onrender.com/api/conversation/${conversationId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
    },

    onSuccess: (response) => {
      if (!response.ok) {
        return;
      }
      refetch();
    },
  });

  return (
    <div className="messages">
      {isLoading && "Loading..."}
      {isError && error.message}
      {data && (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.conversations.map((conversation) => (
                <tr
                  className={
                    currUser.isSeller
                      ? conversation.readBySeller
                        ? ""
                        : "active"
                      : conversation.readByBuyer
                      ? ""
                      : "active"
                  }
                  key={conversation._id}
                >
                  <td>
                    {currUser.isSeller
                      ? conversation.buyer.username
                      : conversation.seller.username}
                  </td>
                  <td>
                    <Link to={`/message/${conversation._id}`}>
                      {conversation?.lastMessage
                        ? conversation?.lastMessage?.slice(0, 20) + "..."
                        : "..."}
                    </Link>
                  </td>
                  <td>{moment(conversation.updatedAt).fromNow()}</td>
                  <td>
                    {((currUser.isSeller && !conversation.readBySeller) ||
                      (!currUser.isSeller && !conversation.readByBuyer)) && (
                      <button
                        onClick={() => {
                          markReadMutation.mutate(conversation._id);
                        }}
                      >
                        Mark as Read
                      </button>
                    )}
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

export default Messages;
