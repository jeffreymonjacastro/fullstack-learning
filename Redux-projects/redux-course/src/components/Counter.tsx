import { useState } from "react";
import {
  decrement, 
  increment, 
  incrementByAmount,
  incrementAsync 
} from "../state/counter/counterSlice";
import { AppDispatch, RootState } from "../state/store"
import { useDispatch, useSelector } from "react-redux"


const Counter = () => {
  // The useSelector hook will be used to access the state of the counter.
  // Parameters: RootState: The type of the state of the store.
  // Return: The value of the counter
  const count = useSelector((state: RootState) => state.counter.value)

  // The useDispatch hook will be used to dispatch the actions of the counter.
  const dispatch = useDispatch<AppDispatch>();

  const [incrementAmount, setIncrementAmount] = useState<Number>(0)

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button 
          onClick={() => dispatch(increment())}
        >Increment</button>

        <button 
          onClick={() => dispatch(decrement())}
        >Decrement</button>
        
        <label htmlFor="number">Increment by amount</label>
        <input 
          type="number" 
          name="number" 
          id="number" 
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
        />
        <button 
          onClick={() => dispatch(incrementAsync(Number(incrementAmount)))}
        >Increment by amount</button>
      </div>
    </div>
  )
}

export default Counter