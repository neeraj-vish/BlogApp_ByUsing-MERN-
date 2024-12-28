import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDetails from '../Components/UserDetails';

const Home = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mern-2024-api-7tat.onrender.com/api/blogs/allblogs', {
          timeout: 10000, 
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // If your API requires cookies
        });
        setBlog(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error.message || error);
        setBlog([]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container text-center my-5" style={{ width: '56%', marginRight: '300px' }}>
        {blog.map((data) => {
          return (
            <div key={data._id} className="card mb-3 bg-secondary text-light my-4" style={{ maxWidth: '760px' }}>
              <div className="row g-0">
                <div className="col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={data.imgUrl} className="img-fluid rounded-start" alt="Blog" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h2 className="card-title">{data.title}</h2>
                    <p className="card-text">{data.description}</p>
                    <p className="card-text"><small>{data.CreatedAt}</small></p>
                    <UserDetails id={data.user} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
