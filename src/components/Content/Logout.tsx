import React from "react";

import { useDispatch } from "react-redux";
import { authActions} from "../../store/authSlice";

import Button from "../UI/Button";
import Modal from "../UI/Modal";

const Logout = props => {
    const dispatch = useDispatch();

    const hideModal = (event) => {
        dispatch(authActions.loggedOut());
    };

    return <Modal>
        <h1>Du er nå logget ut!</h1>
        <Button disabled={false} onClick={hideModal}>OK</Button>
    </Modal>
};

export default Logout;