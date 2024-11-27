import React, { forwardRef, useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

type Ref = HTMLInputElement;

type Props = {};

const FormElement = forwardRef<Ref, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const activate = () => {
    inputRef.current!.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  let element;

  switch (props.type) {
    case "dropdown":
      element = (
        <select name={props.label} id={props.id} onChange={props.onChange}>
          {props.payload
            ? props.payload.map((value, index) => (
                <option key={index} value={value.value}>
                  {value.label}
                </option>
              ))
            : null}
        </select>
      );
      break;
    default:
      element = (
        <input
          ref={inputRef}
          name={props.label}
          id={props.id}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          required={props.required}
        />
      );
  }

  return (
    <tr
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <td>
        <label htmlFor={props.id}>{props.label}</label>
      </td>
      <td>{element}</td>
      {props.hasError && (
        <td>
          <p>{props.error}</p>
        </td>
      )}
    </tr>
  );
});

export default FormElement;
