//import { useSelector, useDispatch } from "react-redux";
import { useBSDispatch, useBSSelector } from "../../hooks/typed-redux-hooks";
import {
  counterIncrement,
  counterIncrease,
  counterDecrement,
  counterToggle,
} from "../../store/counterSlice";

import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useBSDispatch();
  const counter = useBSSelector((state) => state.counter.counter);
  const show = useBSSelector((state) => state.counter.showCounter);

  const toggleCounterHandler = () => {
    dispatch(counterToggle());
  };

  const incrementHandler = () => {
    dispatch(counterIncrement());
  };

  const increaseHandler = () => {
    dispatch(counterIncrease(5));
  };

  const decrementHandler = () => {
    dispatch(counterDecrement());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={decrementHandler}>-</button>
        <button onClick={incrementHandler}>+</button>
        <button onClick={increaseHandler}>+5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
