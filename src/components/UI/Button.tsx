import { FC } from "react";

import classes from "./Button.module.css";

type PropsType = {
  type?: "button" | "submit" | "reset";
  className: string;
  disabled: boolean;
  onClick?: (values: any) => void;
  children?: React.ReactNode
};

const Button: FC<PropsType> = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props. children}
    </button>
  );
};

export default Button;
