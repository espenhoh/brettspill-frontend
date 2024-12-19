import axios from "axios";
import {
  useNavigate,
  useLoaderData,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import React, { useState, useEffect, useRef, ChangeEvent, FC } from "react";

import Button from "../components/UI/Button";
import FormElement from "../components/UI/FormElement";
import useInput from "../hooks/use-input";
import { postNyttSpill } from "../util/posts";
import { Spill, SpillError, SpillType } from "../types/api";

const INPUT_IDS = {
  spillNavn: "spillnavn",
  spilltype: "spilltype",
};

export type SpillTypeData = {
  spillTypeNavn: SpillType[];
};

//import styles from "./LoginContent.module.css";

const CreateGame: FC = () => {
  const nyttSpill = useActionData() as Spill | SpillError;
  const { spillTypeNavn } = useLoaderData() as SpillTypeData; //getSpillTyper(): Promise<SpillType[]>

  const [spillType, setSpillType] = useState<string>();

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

  const spillNavnInputRef = useRef<HTMLInputElement>(null);
  const spillTypeInputRef = useRef(null);

  useEffect(() => {
    document.title = "Opprett et spill";
    setSpillType(spillTypeNavn[0].value);
  }, []);

  const spillTypeChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSpillType(event.target.value);
  };

  return (
    <React.Fragment>
      <h1>Opprett et spill:</h1>

      <Form method="POST" className="form-group">
        {nyttSpill && isSpillError(nyttSpill) && (
          <ul>
            {Object.entries(nyttSpill.errors).map((err) => (
              <li key={err[1][0]}>
                {err[0]}: {err[1][0]}
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
              required={true}
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

function isSpillError(nyttSpill: Spill | SpillError): nyttSpill is SpillError {
  return (nyttSpill as SpillError).errors !== undefined;
}

export const lagSpillAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const spill_data = {
    spill_navn: formData.get("Spillnavn") as string,
    spill_type: formData.get("Spilltype") as string,
  };

  const nyttSpill = await postNyttSpill(spill_data);

  if (isSpillError(nyttSpill)) {
    return nyttSpill;
  } else {
    const ny_url = `/spill/${nyttSpill.id}/`;
    return redirect(ny_url);
  }
};

export default CreateGame;
