import axios from "axios";
import React, { useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
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

const usernameIsValid = (username) => {
  const trimmedUsername = username.trim();
  const reUsername = /^[a-z0-9\u00E6\u00F8\u00E5]*$/;
  return trimmedUsername.length > 6 && reUsername.test(trimmedUsername);
};

const emailValid = (email) => {
  return email.includes("@");
};

const validPass1 = (pass1) => {
  return pass1.length > 7;
};

const validPass2 = (pass1, pass2) => {
  return pass1 === pass2;
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

  //Pick up errors from backend.
  const errors = useActionData();
  console.log(errors);

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  if (pass1HasError) passwordInputRef.current.focus();
  if (emailHasError) emailInputRef.current.focus();
  if (usernameHasError) usernameInputRef.current.focus();

  const formHasError =
    usernameHasError || emailHasError || pass1HasError || pass2HasError;

  useEffect(() => {
    document.title = "Registrer deg nå";
    usernameInputRef.current.focus();
  }, []);

  return (
    <>
      <h1>Lag en brettspillkonto</h1>
      <Form method="post" className="form-group">
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
              error={
                usernameErrorMsg() +
                (errors?.username && ", " + errors.username)
              }
              required={true}
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
              required={true}
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
              required={true}
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
              required={true}
            />
          </tbody>
        </table>
        <input type="hidden" id="errors" name="Errors" value={formHasError} />
        <Button type="submit" className="reg-button" disabled={false}>
          Registrer
        </Button>
      </Form>
    </>
  );
};

export async function registerAction({ request }) {
  const formData = await request.formData();

  if (formData.get("Errors") === "true") {
    return null; //Do nothing. Validation errors are allready showing
  }

  const regData = {
    username: formData.get("Kallenavn"),
    email: formData.get("Kallenavn"),
    password: formData.get("Passord"),
    password2: formData.get("Passord igjen"),
  };

  const errors = {};

  const register_url = config.url.BASE_URL + "/lobby/register/";
  try {
    const response = await axios.post(register_url, regData, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.username) {
        errors.username = error.response.data.username;
      }

      if (error.response.data.email) {
        errors.email = error.response.data.email;
      }

      if (error.response.data.password) {
        errors.password = error.response.data.password;
      }
    } else if (error.request) {
      return { status: 500, statusText: "Ingen kontakt" };
    } else {
      return { status: 500, statusText: "Noe uventet skjedde!" };
    }
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }

  return redirect("/login/");
}

export default Register;
