import { FC, PropsWithChildren } from "react";

import classes from "./Button.module.css";

interface Props extends PropsWithChildren {
  type?: "button" | "submit" | "reset";
  className: string;
  disabled: boolean;
  onClick?: (values: any) => void;
}

const Button: FC<Props> = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
