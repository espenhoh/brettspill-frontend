import { useReducer, ChangeEvent, FocusEvent } from "react";

const initalState = { value: "", isTouched: false, errorMsg: "" };

const valueReducer = (state: StateType, action: ActionType) => {
  return { ...state, ...action };
};

type StateType = {
  value: string;
  isTouched: boolean;
  errorMsg: string;
};

type ActionType = {
  value?: string;
  isTouched?: boolean;
  errorMsg?: string;
};

const useInput = (
  defErrorMsg: string,
  validator: (username: string) => boolean
) => {
  const [inputState, dispatchInput] = useReducer(valueReducer, initalState);

  const valueIsValid = validator(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;
  const backendError = inputState.errorMsg.length > 0;

  const valueInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchInput({ value: event.target.value });
  };

  const inputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    if (inputState.value) {
      dispatchInput({ isTouched: true });
    }
  };

  const reset = () => {
    dispatchInput(initalState);
  };

  const errorHandler = (errorMsg: string) => {
    if (errorMsg !== undefined) {
      //const msg = errorMsg.join(", ");
      dispatchInput({ errorMsg: errorMsg });
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
