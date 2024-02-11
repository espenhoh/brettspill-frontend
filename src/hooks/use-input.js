import { useReducer } from "react";

const initalState = { value: "", isTouched: false, errorMsg: "" };

const valueReducer = (state, action) => {
  return { ...state, ...action };
};

const useInput = (defErrorMsg, validator) => {
  const [inputState, dispatchInput] = useReducer(valueReducer, initalState);

  const valueIsValid = validator(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;
  const backendError = inputState.errorMsg.length > 0;

  const valueInputHandler = (event) => {
    dispatchInput({ value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    if (inputState.value) {
      dispatchInput({ isTouched: true });
    }
  };

  const reset = (event) => {
    dispatchInput(initalState);
  };

  const errorHandler = (errorMsg) => {
    if (errorMsg !== undefined) {
      const msg = errorMsg.join(", ");
      dispatchInput({ errorMsg: msg });
    }
  };

  const errorMsg = () => {
    return [
      hasError ? defErrorMsg : "",
      backendError ? inputState.errorMsg : "",
    ]
      .filter(Boolean) //Filtrerer tomme strenger
      .join(". ");
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError: hasError || backendError,
    errorMsg,
    valueInputHandler,
    inputBlurHandler,
    errorHandler,
    reset,
  };
};

export default useInput;
