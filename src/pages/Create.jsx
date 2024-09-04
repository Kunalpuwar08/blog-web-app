import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../constant";
import { useAuth } from "../../AuthContext";

const Create = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location?.state?.blog;

  const [title, setTitle] = useState(blog?.title || "");
  const [description, setDescription] = useState(blog?.description || "");
  const [category, setCategory] = useState(blog?.category || "");

  const onDataChange = () => {
    if (blog) {
      axios
        .put(
          `${API_URL}/blog/${blog._id}`,
          { title, description, category },
          {
            headers: {
              token: userData?.token,
            },
          }
        )
        .then((res) => {
          console.log(res, "res>>>>>");

          if (res.status === 200) {
            navigate("/home");
          }
        });
    } else {
      axios
        .post(
          `${API_URL}/blog/create`,
          {
            title,
            description,
            category,
          },
          {
            headers: {
              token: userData?.token,
            },
          }
        )
        .then((res) => {
          console.log(res, "res>>>>>");

          if (res.status === 200) {
            navigate("/home");
          }
        });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-primary 100-w vh-100">
      <div className="bg-white w-75 h-75 m-auto p-5">
        <div>
          <h3>{blog ? "Edit Blog" : "Create Blog"}</h3>

          <div className="mb-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="description">Description</label>
            <textarea
              rows={8}
              type="text"
              placeholder="Enter Description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="Enter Category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button onClick={onDataChange} className="btn btn-primary w-100">
            {blog ? "Edit" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
