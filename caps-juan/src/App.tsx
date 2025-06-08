import { useState, useEffect } from 'react'
import './App.css'
import Window from './components/Window';

// function hello(int: number) {
//   console.log('Hello, world!', int);
// }

const hello = (int: number): void => {
  console.log('Hello, world!', int);
}


// JavaScript / TypeScript
// function <name>(<params>) {
// body
// }

// Arrow function (lambda, anonymous function)
// const <name> = (<params) => { // body}

// Struct

export default function App() {
  // ASIII
  // const [<name>, set<Name>] = useState(<default>);  
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  // TypeScript
  // NO SE USA ASI
  const myvar: string = "World";

  function addOne() {
    setCount(count + 1);
    setFlag(!flag);
  }

  // useEffect
  // function
  // [<variables a ver>] Si una de estas cambia, se ejecuta la funcion
  useEffect(() => {
    // Creation | Modifique
    console.log('Aqui estoy');
    console.log('Count:', count);

    // Destruction
    return () => { }
  }, [count]) // Cualquier variable que se modifique

  // HTML
  return (
    <>
      <div className='flex'>
        <h1 className='bg-red-500 font-bold'>Hello! {myvar} </h1>
        {/* Onclick recibe una funcion */}
        <button
          onClick={() => {
            addOne();
          }}
        >Click me!</button>
        <h1>{count} clicks</h1>
      </div>
      {flag && <Window />}
    </>
  )
}


