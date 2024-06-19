/* This file will contain all the store, actions, reducers of counter*/

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Store
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// The Slice is a function that will take the initial state and an object full of reducer functions, and it will return a new slice object with the auto-generated action creators and action types.
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // The incrementByAmount action will take a payload and increment the value of the counter by the payload.
    incrementByAmount: (state, action: PayloadAction<number>) => { 
      state.value += action.payload;
    }
  },
  // The extraReducers will allow us to handle the actions of the createAsyncThunk.
  extraReducers: (builder) => {
    builder
      .addCase(
        incrementAsync.pending,  // When the action is pending
        (state) => { 
          console.log("incrementAsync is pending. Actual value:", state.value);
        }
      )
      .addCase(
        incrementAsync.fulfilled, // When the action is fulfilled
        (state, action: PayloadAction<number>) => { 
          state.value += action.payload;
        }
      );
  },
})

// Async Actions
// createAsyncThunk is a function that accepts a string action type and a payload creator function that returns a promise containing the payload value.
export const incrementAsync = createAsyncThunk(
  "count/incrementAsync", // The name of the action
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
)


// Actions
// We export the actions of the createSlide to use them in the components.
export const { increment, decrement, incrementByAmount } = counterSlice.actions


// Reducer
// We export the reducer of the createSlide to use it in the store.
export default counterSlice.reducer