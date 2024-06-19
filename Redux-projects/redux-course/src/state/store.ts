/* The file store.ts will allow to use Redux Tookit and create the global state */

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';

// The configureStore function will create a Redux store with all the reducers combined.
export const store = configureStore({
  reducer: {
    counter: counterReducer, // The counterReducer will be used to manage the state of the counter.
  },
})

// For TypeScript
// The RootState type will be used to define the type of the useSelector hook in the components.
export type RootState = ReturnType<typeof store.getState>

// The AppDispatch type will be used to define the type of the useDispatch hook in the components.
export type AppDispatch = typeof store.dispatch 