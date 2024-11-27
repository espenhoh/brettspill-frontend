import axios, { AxiosError, AxiosResponse } from "axios";
import { erOK } from "../util/posts";

import React, { useEffect, useRef } from "react";
import { Link, useNavigate, Form, redirect } from "react-router-dom";
import { useActionData, ActionFunction } from "react-router-typesafe";
import FormElement from "../components/UI/FormElement";
import useInput from "../hooks/use-input";

import { useDispatch } from "react-redux";
import store from "../store/index";
import { authActions } from "../store/authSlice";

//import styles from "./LoginContent.module.css";

const INPUT_IDS = {
  USERNAME: "kallenavn",
  PASS1: "pass",
};

const validPass1 = (pass1: string) => {
  return pass1.length > 7;
};

const usernameIsValid = (username: string) => {
  const trimmedUsername = username.trim();
  const reUsername = /^[a-z0-9\u00E6\u00F8\u00E5]*$/;
  return trimmedUsername.length > 4 && reUsername.test(trimmedUsername);
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorData = useActionData<typeof loginAction>();

  console.log("Data ", errorData);

  const {
    value: username,
    hasError: usernameHasError,
    valueInputHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    errorHandler: usernameError,
    errorMsg: usernameErrorMsg,
  } = useInput(
    "Kallenavn må være > 4 tegn og bare bokstaver og tall",
    usernameIsValid
  );

  const {
    value: pass1,
    hasError: pass1HasError,
    valueInputHandler: pass1ChangeHandler,
    inputBlurHandler: pass1BlurHandler,
    errorHandler: pass1Error,
    errorMsg: pass1ErrorMsg,
  } = useInput("passord > 7 tegn", validPass1);

  useEffect(() => {
    if (errorData?.username !== undefined) {
      usernameError(errorData.username);
    }
    if (errorData?.password) {
      pass1Error(errorData.password);
    }
  }, [errorData]);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Logg inn";
    usernameInputRef.current?.focus();
  }, []);

  return (
    <>
      <h1>Logg deg inn!</h1>
      {errorData && errorData.status === 500 && <h2>{errorData.statusText}</h2>}
      <Form method="post">
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
          </tbody>
        </table>
        <p>
          Ikke registrert enda? Lag en spillkonto{" "}
          <Link to="/lobby/register">her</Link>.
        </p>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </Form>
    </>
  );
};

export default Login;

type ErrorData = {
  username?: string;
  password?: string;
  status?: 500;
  statusText?: "Ingen kontakt" | "Noe uventet skjedde!";
};

export const loginAction = (async ({ request }: { request: Request }) => {
  store.dispatch(authActions.login());

  const formData = await request.formData();
  const loginData = {
    username: formData.get("Kallenavn"),
    password: formData.get("Passord"),
  };

  try {
    const response: AxiosResponse = await axios.post(
      "/lobby/login/",
      loginData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Access to config, request, and response
      const error = e as AxiosError;
      if (error.response?.data) {
        return error.response.data as ErrorData;
      }
      return { status: 500, statusText: "Ingen kontakt" } as ErrorData;
    } else {
      // Just a stock error
      return { status: 500, statusText: "Noe uventet skjedde!" } as ErrorData;
    }
  }

  return redirect("/spill/");
}) satisfies ActionFunction;
