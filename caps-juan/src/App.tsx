import { useState, useEffect } from 'react'
import './App.css'
import Window from './components/Window';
import type { ComponentProps, Post, User } from './interfaces/myInterfaces';
import { postData, fetchData, postUser } from './services/api';

// function hello(int: number) {
//   console.log('Hello, world!', int);
// }

// const hello = (int: number): void => {
//   console.log('Hello, world!', int);
// }


// JavaScript / TypeScript
// function <name>(<params>) {
// body
// }

// Arrow function (lambda, anonymous function)
// const <name> = (<params) => { // body}

// Template string
// const cadena = "hello";
// const cadena2 = 'hello';
// const cadena3 = `hello ${10}`;

// Algo asi como un struct
// interface Post {
//   title: string;
//   body: string;
//   userId: number;
// }

// interface functType {
//   foo: () => void;
// }

// const varrrr: functType = {
//   foo: () => {
//     console.log('Hola, mundo!');
//   }
// }

// varrrr.foo();

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

  // fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   .then(response => response.json())
  //   .then(json => console.log(json))

  // Async / await
  // function

  const mypost: Post = {
    title: 'mypost',
    body: 'lorem ipsun',
    userId: 2,
  }


  // fetchData("posts", 101);

  localStorage.setItem("Hola", String(10));


  const token = localStorage.getItem('Hola');

  // console.log(token);
  // postData(mypost, token);


  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);

    const user: User = { name, email };
    postUser(user, token);
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
  }, []) // Cualquier variable que se modifique

  // const propArg: ComponentProps = {
  //   title: "Hello",
  //   num: 2,
  // }

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
      {flag && <Window title="hello" num={1} />}
      {/* {flag && <Window {...propArg} />} */}

      {console.log('hi')}

      <form onSubmit={(e) => submitForm(e)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={(e) => { setName(e.target.value) }} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
        <br />
        <button className="bg-blue-500 rounded-full" type="submit">Submit</button>
      </form>
    </>
  )
}


