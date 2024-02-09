import axios from "axios";
import React, { useEffect, useRef } from "react";
import Button from "../components/UI/Button";
import FormElement from "../components/UI/FormElement";
import useInput from "../hooks/use-input";

import { config } from "../constants";

const INPUT_IDS = {
  USERNAME: "regkallenavn",
  EMAIL: "regepost",
  PASS1: "pass1",
  PASS2: "pass2",
};

//import styles from "./LoginContent.module.css";

const validPass1 = (pass1) => {
  return pass1.length > 7;
};

const validPass2 = (pass1, pass2) => {
  return pass1 === pass2;
};

const usernameIsValid = (username) => {
  const trimmedUsername = username.trim();
  const reUsername = /^[a-z0-9\u00E6\u00F8\u00E5]*$/;
  return trimmedUsername.length > 6 && reUsername.test(trimmedUsername);
};

const emailValid = (email) => {
  return email.includes("@");
};

const Register = (props) => {
  const {
    value: username,
    hasError: usernameHasError,
    valueInputHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    errorHandler: usernameError,
    errorMsg: usernameErrorMsg,
    reset: usernameReset,
  } = useInput(
    "Kallenavn må være > 6 tegn og bare bokstaver og tall",
    usernameIsValid
  );

  const {
    value: email,
    hasError: emailHasError,
    valueInputHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    errorHandler: emailError,
    errorMsg: emailErrorMsg,
    reset: emailReset,
  } = useInput("Skriv inn gyldig epost", emailValid);

  const {
    value: pass1,
    hasError: pass1HasError,
    valueInputHandler: pass1ChangeHandler,
    inputBlurHandler: pass1BlurHandler,
    errorHandler: pass1Error,
    errorMsg: pass1ErrorMsg,
    reset: pass1Reset,
  } = useInput("passord > 7 tegn", validPass1);

  const {
    value: pass2,
    hasError: pass2HasError,
    valueInputHandler: pass2ChangeHandler,
    inputBlurHandler: pass2BlurHandler,
    errorMsg: pass2ErrorMsg,
    reset: pass2Reset,
  } = useInput("Passord matcher ikke", validPass2.bind(null, pass1));

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const formHasError =
    usernameHasError || emailHasError || pass1HasError || pass2HasError;

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(username);
    console.log(email);
    console.log(pass1);
    console.log(pass2);
    if (formHasError) {
      return;
    }
    const register_url = "config.url.BASE_URL" + "/lobby/register/";
    axios
      .post(
        register_url,
        {
          username,
          email,
          password: pass1,
          password2: pass2,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.data);

        usernameReset();
        emailReset();
        pass1Reset();
        pass2Reset();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.username) {
          usernameError(error.response.data.username);
          usernameInputRef.current.focus();
        }

        if (error.response.data.email) {
          emailError(error.response.data.email);
          emailInputRef.current.focus();
        }

        if (error.response.data.password) {
          pass1Error(error.response.data.password);
          passwordInputRef.current.focus();
        }
      });
  };

  useEffect(() => {
    document.title = "Registrer deg nå";
    usernameInputRef.current.focus();
  }, []);

  return (
    <React.Fragment>
      <h1>Lag en brettspillkonto</h1>
      <form onSubmit={submitHandler} method="POST" className="form-group">
        <table>
          <tbody>
            <FormElement
              ref={usernameInputRef}
              id={INPUT_IDS.USERNAME}
              label="Kallenavn"
              type="text"
              hasError={usernameHasError}
              value={username}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              error={usernameErrorMsg()}
            />
            <FormElement
              ref={emailInputRef}
              id={INPUT_IDS.EMAIL}
              label="Epost"
              type="email"
              hasError={emailHasError}
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailErrorMsg()}
            />
            <FormElement
              ref={passwordInputRef}
              id={INPUT_IDS.PASS1}
              label="Passord"
              type="password"
              hasError={pass1HasError}
              value={pass1}
              onChange={pass1ChangeHandler}
              onBlur={pass1BlurHandler}
              error={pass1ErrorMsg()}
            />
            <FormElement
              ref={passwordInputRef}
              id={INPUT_IDS.PASS2}
              label="Passord igjen"
              type="password"
              hasError={pass2HasError}
              value={pass2}
              onChange={pass2ChangeHandler}
              onBlur={pass2BlurHandler}
              error={pass2ErrorMsg()}
            />
          </tbody>
        </table>

        <Button type="submit" className="reg-button" disabled={false}>
          Registrer
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Register;
