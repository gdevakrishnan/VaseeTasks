import React, { useState, Fragment } from 'react';
import "../static/userlogin.css";
import { workerLogin } from '../services/serviceWorker';

function UserLogin() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    for (const field in formData) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }
    workerLogin(formData)
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        localStorage.setItem("vaseetasks-token", response.data.token);
      })
      .catch((e) => {
        console.log(e.message)
      }
      );
  };

  return (
    <Fragment>
      <section className="page user_login_page login_page">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="company_id">Company ID</label>
              <input
                type="text"
                id="company_id"
                name="company_id"
                value={formData.company_id}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
      </section>
    </Fragment>
  );
}

export default UserLogin;
