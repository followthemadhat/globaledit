import React, { useCallback, useEffect, useState } from "react";

import logo from "../assets/logo.svg";


function LoginForm({showModal}:{showModal:any}) {
  const initialValues = { username: "", password: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);


  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const togglePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    setVisiblePassword(!visiblePassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values: { username: string; password: string }) => {
    let errors: any = {};

    if (!values.username) {
      errors.username = "Cannot be blank";
    }

    if (!values.password) {
      errors.password = "Cannot be blank";
    }

    return errors;
  };

  const submit = useCallback(() => {
      console.log("success");
      setFormValues({
         username: "", 
         password: ""
      });
    }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors, isSubmitting, submit]);

  return (
    <div className="form-wrapper">
      <h1>Welcome</h1>
      <h2>Please sign in to continue</h2>
      <div className="hr"></div>
      <img className="logo" src={logo} alt="logo" />
      <form onSubmit={handleSubmit} noValidate className="form">
        <div className="form-group">
          {Object.keys(formErrors).length === 0 && isSubmitting && (
            <span className="success">Form submitted successfully</span>
          )}
          <label htmlFor="username">Username</label>
          <input
            onChange={changeInput}
            value={formValues.username}
            type="text"
            name="username"
            id="username"
            className={formErrors.username && "input-error"}
          />
          {formErrors.username && (
            <span className="error">{formErrors.username}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={changeInput}
            value={formValues.password}
            type={visiblePassword ? "text" : "password"}
            name="password"
            id="password"
            className={formErrors.password && "input-error"}
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
          <span onClick={togglePassword} className="show-password">
            {visiblePassword ? "Hide" : "Show"}
          </span>
        </div>
        <div className="button-wrap">
          <button className="btn btn-primary" type="submit" id="submit-btn">
            Sign In
          </button>
          <span onClick={showModal} className="forgot-password">Forgot password?</span>
        </div>
      </form>
      <div className="hr"></div>
    </div>
  );
}

export default LoginForm;
