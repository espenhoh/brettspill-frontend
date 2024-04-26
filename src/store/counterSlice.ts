import { createSlice } from "@reduxjs/toolkit";

const initState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initState,
  reducers: {
    counterIncrement: (state) => {
      state.counter += 1;
    },
    counterIncrease: (state, action) => {
      state.counter += action.payload;
    },
    counterDecrement: (state) => {
      state.counter -= 1;
    },
    counterToggle: (state) => {
      state.showCounter = !state.showCounter;
    },
  },
});

export const {
  counterIncrement,
  counterIncrease,
  counterDecrement,
  counterToggle,
} = counterSlice.actions;
export default counterSlice.reducer;
