import Counter from "./components/Counter"

/* STORE */
// In Redux, store is a place where the state of the application is stored.
// interface CounterState {
//   value: number;
// }

// interface UserState {
//   isSignedIn: boolean;
// }

/* ACTIONS */
// In Redux, actions are payloads of information that send data from your application to your store.
// Example:
// const incrementByAmount = { type: "INCREMENT", payload: 10 }
// const decrement = { type: "DECREMENT" }
// Type: It is a string that indicates the type of action being performed to the State.
// Payload: (Optional) It is the data that is being sent to the State.


/* REDUCERS */
// In Redux, reducers specify how the application's state changes in response to actions sent to the store.
// Reducers will never actually mutate the state. Instead, they copy the previous state and return a new state.


function App() {
  return (
    <>
      <h1>Redux Tutorial</h1>
      <Counter />
    </>
  )
}

export default App
