import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constant";
import moment from "moment";
import "./style.css";
import { useAuth } from "../../AuthContext";

const Home = () => {
  const { userData, setIsLoggedIn, setUserData } = useAuth();
  const navigate = useNavigate();
  const [blogListData, setBlogListData] = useState([]);

  const getAllPost = () => {
    axios.get(`${API_URL}/blog/list`).then((res) => setBlogListData(res.data));
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const onDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure? do you want to delete this blog?"
    );
    if (confirm) {
      axios
        .delete(`${API_URL}/blog/${id}`, {
          headers: {
            token: userData?.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setBlogListData(blogListData.filter((i) => i._id !== id));
          }
        })
        .catch((err) => console.log(err, ">>>>>>>>>>>>>>>>>>>>>>"));
    }
  };

  const onEdit = (blog) => {
    navigate("/create", { state: { blog } });
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setUserData([]);
  };

  return (
    <div className="100-w vh-100 bg-white">
      <div className="bg-primary d-flex justify-content-between p-3">
        <h3 className="text-white">MyBlogs</h3>

        <div className="d-flex">
          <button
            onClick={() => navigate("/create")}
            className="btn btn-danger w-20"
          >
            Create Blog
          </button>
          <button onClick={onLogout} className="btn btn-primary w-20">
            Logout
          </button>
        </div>
      </div>

      {/* Blog List */}

      <div className="w-75 h-100 m-auto">
        {blogListData?.map((item, index) => {
          return (
            <div
              className="blog-box w-75 m-auto h-auto bg-info my-2 rounded"
              key={index}
            >
              <p className="title">{item.title}</p>
              <p>Category: {item.category}</p>
              <p>Status: {item.status}</p>
              <p>createdAt: {moment(item.createdAt).format("LL")}</p>

              <div className="d-flex justify-align-content-around">
                <button
                  className="btn btn-outline-danger w-40"
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="btn btn-outline-warning w-40"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
