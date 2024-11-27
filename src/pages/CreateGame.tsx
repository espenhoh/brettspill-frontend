import axios from "axios";
import {
  useNavigate,
  useLoaderData,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

import Button from "../components/UI/Button";
import FormElement from "../components/UI/FormElement";
import useInput from "../hooks/use-input";
import { postNyttSpill } from "../util/posts";

const INPUT_IDS = {
  spillNavn: "spillnavn",
  spilltype: "spilltype",
};

//import styles from "./LoginContent.module.css";

const CreateGame = (props) => {
  const data = useActionData();
  const spillTypeNavn = useLoaderData().data;

  const [spillType, setSpillType] = useState();

  const navigate = useNavigate();

  const {
    value: spillNavn,
    hasError: spillNavnHasError,
    valueInputHandler: spillNavnChangeHandler,
    inputBlurHandler: spillNavnBlurHandler,
    errorHandler: spillNavnError,
    errorMsg: spillNavnErrorMsg,
    reset: spillNavnReset,
  } = useInput("", () => true);

  const spillNavnInputRef = useRef();
  const spillTypeInputRef = useRef();

  useEffect(() => {
    document.title = "Opprett et spill";
    setSpillType(spillTypeNavn[0].value);
  }, []);

  const spillTypeChangeHandler = (e) => {
    setSpillType(e.target.value);
  };

  return (
    <React.Fragment>
      <h1>Opprett et spill:</h1>

      <Form method="POST" className="form-group">
        {data && data.errors && (
          <ul>
            {Object.entries(data.errors).map((err) => (
              <li key={err[1]}>
                {err[0]}: {err[1]}
              </li>
            ))}
          </ul>
        )}
        <table>
          <tbody>
            <FormElement
              ref={spillNavnInputRef}
              id={INPUT_IDS.spillNavn}
              label="Spillnavn"
              type="text"
              hasError={spillNavnHasError}
              value={spillNavn}
              onChange={spillNavnChangeHandler}
              onBlur={spillNavnBlurHandler}
              error={spillNavnErrorMsg()}
            />
            <FormElement
              ref={spillTypeInputRef}
              id={INPUT_IDS.spillNavn}
              label="Spilltype"
              type="dropdown"
              payload={spillTypeNavn}
              onChange={spillTypeChangeHandler}
            />
          </tbody>
        </table>

        <Button type="submit" className="reg-button" disabled={false}>
          Opprett
        </Button>
      </Form>
    </React.Fragment>
  );
};

export interface SpillData {
  spill_navn: string;
  spill_type: string;
}

export const lagSpill = async ({ request }) => {
  const formData = await request.formData();

  const spill_data = {
    spill_navn: formData.get("Spillnavn"),
    spill_type: formData.get("Spilltype"),
  };

  const nyttSpill = await postNyttSpill(spill_data);

  if (nyttSpill.errors) {
    return nyttSpill;
  }

  const ny_url = `/spill/${nyttSpill.id}/`;
  return redirect(ny_url);
};

export default CreateGame;
