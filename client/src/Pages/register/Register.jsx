import React, { useState } from 'react';
import './register.scss';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import upload from '../../utils/cloudenaryUpload/upload.js';
import newRequest from '../../utils/newRequest.js';
import { useNavigate } from 'react-router-dom';

function register() {
  const [file, setFile] = useState('');
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading state to true before the request
    setIsLoading(true);

    const url = await upload(file);
    try {
      await newRequest.post('auth/register', {
        ...user,
        img: url,
      });
      console.log(user);
      navigate('/login');
    } catch (err) {
      console.log(err);
    } finally {
      // Set loading state to false after the request completes
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            required
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            required
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} required />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress size={20} thickness={5} color="inherit" />
            ) : (
              'Register'
            )}
          </button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default register;
