import { useEffect } from "react"

export default function Window() {

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
      <h1 style={{ backgroundColor: 'lightblue' }}> WINDOW !!</h1>
    </>
  )
}