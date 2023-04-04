import React, { useState, useRef, useEffect } from "react";
import GigCard from "../../components/gigCard/GigCard";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import "./Gigs.scss";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("price");

  const minRef = useRef();
  const maxRef = useRef();
  const queryClient = useQueryClient();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigsData"],
    queryFn: async () => {
      const response = await fetch(
        `https://fiverr-backend-xke3.onrender.com/api/gig/all${search || "?"}${
          search && "&"
        }min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`,
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

  useEffect(() => {
    refetch();
  }, [sort]);

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR &gt; GRAPHICS & DESIGN</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder="min" ref={minRef} />
            <input type="text" placeholder="max" ref={maxRef} />
            <button
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ["gigsData"] });
              }}
            >
              Apply
            </button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "price" ? `Best Selling` : `Newest`}
            </span>
            <img
              src="./img/down.png"
              alt="arrowDown"
              onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "price" ? (
                  <span
                    onClick={() => {
                      setSort("createdAt");
                      setOpen(false);
                    }}
                  >
                    Newest
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setSort("price");
                      setOpen(false);
                    }}
                  >
                    Best selling
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading && "loading"}
          {error && "Something went wrong"}
          {data && data?.gigs?.length === 0 ? (
            <span className="results">Unfortunately we found no results.</span>
          ) : (
            data?.gigs.map((gig) => <GigCard key={gig._id} item={gig} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
