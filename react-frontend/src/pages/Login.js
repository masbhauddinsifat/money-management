import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
const initialValues = {
  //   username: "",
  email: "",
  password: "",
};

const onSubmit = (values) => {
  alert("Your Form is Submitted");
  console.log({ values });
};

const validationSchema = Yup.object({
  username: Yup.string().required("UserName is Required"),
  email: Yup.string()
    .email("InValid Email Address")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Password is Required"),
});

const Login = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      <div className="form">
        <Form>
          {/* <div className="form-control">
            <label htmlFor="username"> User Name </label>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Enter Your UserName"
            />
            <ErrorMessage name="username">
              {(errMsg) => <div className="errors">{errMsg}</div>}
            </ErrorMessage>
          </div> */}
          <div className="form-control">
            <label htmlFor="email"> E-mail </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your E-mail"
            />
            <ErrorMessage name="email">
              {(errMsg) => <div className="errors">{errMsg}</div>}
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label htmlFor="Password"> Password </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder=" Enter Your Password"
            />
            <ErrorMessage name="password">
              {(errMsg) => <div className="errors">{errMsg}</div>}
            </ErrorMessage>
          </div>
          <div className="loginbtn">
            <button className="btn" type="submit">
              Log In
            </button>
            <span style={{ marginLeft: "10px", color: "red" }}>
              Not Any Account?
              <Link to="/signup" className="link">
                <span
                  style={{
                    marginLeft: "5px",
                    color: "blue",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}>
                  SignUp
                </span>
              </Link>
            </span>
            <p>
              <Link to="/forgotpassword" className="link">
                Forgot Password?
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default Login;
