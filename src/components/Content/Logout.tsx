import React, { FC } from "react";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import Button from "../UI/Button";
import Modal from "../UI/Modal";

const Logout: FC = () => {
  const dispatch = useDispatch();

  const hideModal = () => {
    dispatch(authActions.loggedOut());
  };

  return (
    <Modal>
      <h1>Du er nå logget ut!</h1>
      <Button className="logout-button" disabled={false} onClick={hideModal}>
        OK
      </Button>
    </Modal>
  );
};

export default Logout;
