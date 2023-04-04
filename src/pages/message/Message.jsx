import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";

const Message = () => {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  const msgRef = useRef();
  const msgContainerRef = useRef();

  const { id: conversationId } = useParams();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await fetch(
        `https://fiverr-backend-xke3.onrender.com/api/message/${conversationId}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      return response.json();
    },
    enabled: !!conversationId,
  });

  const sendMsgMutation = useMutation({
    mutationFn: (message) => {
      return fetch("https://fiverr-backend-xke3.onrender.com/api/message", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          conversation: conversationId,
        }),
      });
    },

    onSuccess: (response) => {
      if (!response.ok) {
        return;
      }
      msgRef.current.value = "";
      refetch();
    },
  });

  useEffect(() => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }, [msgContainerRef.current, data]);

  return (
    <div className="message">
      {isLoading && "Loading..."}
      {isError && error.message}
      {data && (
        <div className="container">
          <span className="breadcrumbs">
            <Link to="/messages">MESSAGES</Link> &gt; {data.with.toUpperCase()}
          </span>
          <div className="messages" ref={msgContainerRef}>
            {data.messages.map((msg) => (
              <div
                key={msg._id}
                className={`item${
                  msg.from.username === currUser.username ? " owner" : ""
                }`}
              >
                <img
                  src={msg.from?.profilePic || "/img/noavatar.jpg"}
                  alt="user"
                />
                <p>{msg.content}</p>
              </div>
            ))}
          </div>
          <hr />
          <div className="write">
            <textarea
              autoFocus
              placeholder="Write a message"
              cols="30"
              rows="5"
              ref={msgRef}
            ></textarea>
            <button
              onClick={() => {
                msgRef.current.value.trim() !== "" &&
                  sendMsgMutation.mutate(msgRef.current.value.trim());
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
