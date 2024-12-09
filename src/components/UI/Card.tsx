import { FC } from "react";
import "./Card.css";

const Card: FC<{ className: string; children: React.ReactNode }> = (props) => {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
};

export default Card;
