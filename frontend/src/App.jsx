import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('User created successfully:', data);

      alert("Form submitted successfully");

      // Optionally reset form
      setFormData({
        name: "",
        email: "",
        message: "",
        number: "",
      });

    } catch (error) {
      console.error('Error creating user:', error);
      alert("Something went wrong while submitting the form");
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Contact Form</h1>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label htmlFor="message">Message:</label>
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message"
        />

        <label htmlFor="number">Number:</label>
        <input
          type="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Enter your number"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
