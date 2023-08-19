import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import "./CreateUser.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = () => {
  const initialValues = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [newUser, setNewUser] = useState(initialValues);
  //   const [formErrors, setFormErrors] = useState(req);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (!newUser.firstName) {
      errors.firstName = "First name is required.";
    } else if (/\d/.test(newUser.firstName)) {
      errors.firstName = "First name should not contain numbers.";
    }

    if (!newUser.lastName) {
      errors.lastName = "Last name is required.";
    } else if (/\d/.test(newUser.lastName)) {
      errors.lastName = "Last name should not contain numbers.";
    }

    if (!newUser.title) {
      errors.title = "Title is required.";
    } else if (/\d/.test(newUser.title)) {
      errors.title = "Title should not contain numbers.";
    }

    if (!newUser.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Invalid email address.";
    }

    return errors;
  };
  const handleAddUser = (values, event) => {
    // event.preventDefault();

    axios
      .post("https://dummyapi.io/data/v1/user/create", newUser, {
        headers: {
          "app-id": process.env.REACT_APP_SECRET_KEY,
        },
      })

      .then(({ data }) => {
        console.log(data);
        toast.success("User Added Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });

        navigate("/");
      })

      .catch(() =>
        toast.error("url is wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
  };

  return (
    <div className="container mt-5">
      <h2>New User Form</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleAddUser}
      >
        <Form>
          <div>
            <label className="form-label">Title:</label>
            <Field
              type="text"
              name="title"
              value={newUser.title}
              className="form-control"
              onChange={handleChange}
            />
            <ErrorMessage name="title" component="div" className="error" />
            <label className="form-label">firstName:</label>

            <Field
              type="text"
              name="firstName"
              value={newUser.firstName}
              className="form-control"
              onChange={handleChange}
            />
            <ErrorMessage name="firstName" component="div" className="error" />
            <label className="form-label">lastName:</label>

            <Field
              type="text"
              name="lastName"
              value={newUser.lastName}
              className="form-control"
              onChange={handleChange}
            />
            <ErrorMessage name="lastName" component="div" className="error" />
            <label className="form-label">email:</label>

            <Field
              type="email"
              name="email"
              value={newUser.email}
              className="form-control"
              onChange={handleChange}
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <button type="submit" className="btn btn-primary">
            Add User
          </button>

          <Link to="/">
            <button type="submit" className="btn btn-primary ms-3">
              cancle
            </button>
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateUser;
