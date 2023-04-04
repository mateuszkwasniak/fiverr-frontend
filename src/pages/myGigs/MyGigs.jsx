import React from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

const MyGigs = () => {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["sellersGigs"],
    queryFn: async () => {
      const response = await fetch(
        `https://fiverr-backend-xke3.onrender.com/api/gig/all?userId=${currUser._id}`
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      } else return result;
    },
  });

  const deleteGigMutation = useMutation({
    mutationFn: (gigId) => {
      return fetch(
        `https://fiverr-backend-xke3.onrender.com/api/gig/${gigId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
    },

    onSuccess: (response) => {
      if (!response.ok) {
        return;
      } else refetch();
    },
  });

  return (
    <div className="mygigs">
      <div className="container">
        {isLoading && "Loading..."}
        {isError && error.message}
        {data && (
          <>
            <div className="title">
              <h1>Gigs</h1>
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.gigs.map((gig) => (
                  <tr key={gig._id}>
                    <td>
                      <img
                        className="img"
                        src={
                          gig?.cover ||
                          "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        }
                        alt="cover"
                      ></img>
                    </td>
                    <td>{gig.title}</td>
                    <td>${gig.price}</td>
                    <td>{gig.sales}</td>
                    <td>
                      <img
                        src="/img/delete.png"
                        alt="delete"
                        className="delete"
                        onClick={() => {
                          deleteGigMutation.mutate(gig._id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
