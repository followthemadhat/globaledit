import React, { useCallback, useEffect, useState } from "react";

function Popup({hideModal, title, text}: {hideModal: any; title: string; text: string;}) {
  
  const [email, setEmail] = useState<string>("");
  const [formErrors, setFormErrors] = useState({ email: "" });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>(title);
  const [popupText, setPopupText] = useState(text);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors(validateEmail(email));
  };

  const validateEmail = (value: string) => {
    let errors: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(value)) {
      errors.email = "Invalid email format";
    }

    return errors;
  };

  const submit = useCallback(() => {
    console.log("success");
    setFormSubmitted(true);
    setPopupTitle("Email Sent");
    setPopupText(
      "Thank you, instructions to reset your password have been e-mailed to the address you provided!"
    );
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      submit();
    }
  }, [formErrors, submit]);

  return (
    <div className="popup">
      <div className="popup-head">
        {popupTitle}
        <span onClick={hideModal} className="popup-close">
          X
        </span>
      </div>
      <div className="popup-body">
        {popupText}
        {!formSubmitted && (
          <form className="reset-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={inputChange}
              value={email}
              className={formErrors.email && "input-error"}
            />
            {formErrors.email && (<span className="error">{formErrors.email}</span>)}
            <div className="button-wrap">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <button
                onClick={hideModal}
                style={{ margin: "0 auto 0 20px" }}
                className="btn"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Popup;
