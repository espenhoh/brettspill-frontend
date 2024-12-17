import React, { FC, Fragment, PropsWithChildren } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop: FC = () => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay: FC<PropsWithChildren> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal: FC<PropsWithChildren> = (props) => {
  const portalElement = document.getElementById("overlays");
  if (!portalElement) {
    return <div>Ingen overlay funnet!!!</div>;
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
