import React, { useState } from "react";
import "./App.scss";
import LoginForm from "./components/LoginForm";
import Popup from "./components/Popup";

function App() {
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);

  const showModal = () => {
    setVisiblePopup(true);
  }

  const hideModal = () => {
    setVisiblePopup(false);
  }

  return (
    <div className="app">
      <LoginForm showModal={showModal} />
      {visiblePopup && <Popup hideModal={hideModal} title="Reset Password" text="Please enter the email address associated with your globaledit account to reset your password."/>}
    </div>
  );
}

export default App;
