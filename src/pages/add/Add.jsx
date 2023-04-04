import React, { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Add.scss";

const initGig = {
  title: "",
  description: "",
  category: "",
  price: 0,
  cover: "",
  images: [],
  shortTitle: "",
  shortDescription: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  sales: 0,
};

const gigReducer = (state, action) => {
  switch (action.name) {
    case "REGULAR":
      return { ...state, [action.payload[0]]: action.payload[1] };
    case "FEATURES_ADD":
      return { ...state, features: [...state.features, action.payload] };
    case "FEATURES_REMOVE":
      return {
        ...state,
        features: state.features.filter((_, idx) => idx !== action.payload),
      };
    case "FEATURES_SET":
      return {
        ...state,
        features: state.features.map((feature, idx) => {
          if (idx === action.payload[0]) return action.payload[1].trim();
          return feature;
        }),
      };

    default:
      return state;
  }
};

const Spinner = () => {
  return <div className="spinner" />;
};

const Add = () => {
  const [gig, dispatch] = useReducer(gigReducer, initGig);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(false);
    if (
      gig.title.trim() === "" ||
      gig.description.trim() === "" ||
      gig.category.trim() === "" ||
      gig.shortDescription.trim() === ""
    ) {
      setError("Please fill out all fields.");
      return;
    }

    if (gig.deliveryTime === 0 || gig.revisionNumber === 0 || gig.price === 0) {
      setError("Please enter correct delivery time, revision number or price.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(gig).forEach((entry) => {
        if (entry[0] === "images") {
          entry[1].forEach((file) => data.append(entry[0], file));
        } else if (entry[0] === "features") {
          const filtered = gig.features.filter(
            (feature) => feature.trim() !== ""
          );
          data.append(entry[0], JSON.stringify(filtered));
        } else {
          data.append(entry[0], entry[1]);
        }
      });

      const response = await fetch("https://fiverr-backend-xke3.onrender.com/api/gig", {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const details = await response.json();
      if (!response.ok) {
        throw new Error(details.error);
      } else {
        navigate("/mygigs");
      }
    } catch (error) {
      setError(error.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <form onSubmit={submitFormHandler}>
          <label>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. I will do something I'm really good at"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, e.target.value],
              })
            }
          />
          <label>Category</label>
          <select
            name="category"
            id="category"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, e.target.value],
              })
            }
          >
            <option value="" hidden>
              Choose category
            </option>
            <option value="design">Design</option>
            <option value="web">Web Development</option>
            <option value="animation">Animation</option>
            <option value="music">Music</option>
          </select>
          <label>Cover Image</label>

          <input
            type="file"
            name="cover"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, e.target.files[0]],
              })
            }
          ></input>

          <label>Upload Images</label>

          <input
            type="file"
            multiple
            name="images"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, [...e.target.files]],
              })
            }
          ></input>

          <label>Description</label>
          <textarea
            cols="30"
            rows="16"
            placeholder="Brief description to introduce your service to customers"
            name="description"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, e.target.value],
              })
            }
          />
          <label>Service Title</label>
          <input
            type="text"
            placeholder="e.g. One-page web design"
            name="shortTitle"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, e.target.value],
              })
            }
          />
          <label>Short Description</label>
          <textarea
            placeholder="Short description of your service"
            cols="30"
            rows="10"
            name="shortDescription"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, e.target.value],
              })
            }
          ></textarea>
          <label>Delivery Time (e.g. 3 days)</label>
          <input
            type="number"
            min="1"
            max="100"
            name="deliveryTime"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, +e.target.value],
              })
            }
          ></input>
          <label>Revision Number</label>
          <input
            type="number"
            min="1"
            max="100"
            name="revisionNumber"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, +e.target.value],
              })
            }
          ></input>
          <label>Add Features</label>
          <div className="featureSectionWrapper">
            {gig.features.map((feature, idx) => {
              return (
                <div className="inputWrapper" key={idx}>
                  <input
                    value={feature}
                    type="text"
                    placeholder="e.g. page design "
                    onChange={(e) => {
                      dispatch({
                        name: "FEATURES_SET",
                        payload: [idx, e.target.value],
                      });
                    }}
                  />
                  <span>
                    <img
                      src="/img/delete.png"
                      alt="Remove"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                      onClick={() => {
                        dispatch({
                          name: "FEATURES_REMOVE",
                          payload: idx,
                        });
                      }}
                    ></img>
                  </span>
                </div>
              );
            })}
            <div className="buttonWrapper">
              <div
                className="addFeature"
                onClick={() => {
                  dispatch({
                    name: "FEATURES_ADD",
                    payload: "",
                  });
                }}
              >
                +
              </div>
            </div>
          </div>
          <label>Price</label>
          <input
            type="number"
            min="1"
            name="price"
            onChange={(e) =>
              dispatch({
                name: "REGULAR",
                payload: [e.target.name, e.target.value],
              })
            }
          ></input>
          <button type="submit">{loading ? <Spinner /> : "Create"}</button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Add;
