import { useEffect } from "react"
import type { ComponentProps } from "../interfaces/myInterfaces";

// Un conjunto de Tipos 
export default function Window(props: ComponentProps) {


  useEffect(() => {
    // Creation
    // console.log('Window created');

    // Destruction
    return () => {
      // console.log('Window destroyed');
    }
  }, []);

  return (
    <>
      <h1 style={{ backgroundColor: 'lightblue' }}> WINDOW !! {props.title}</h1>
    </>
  )
}