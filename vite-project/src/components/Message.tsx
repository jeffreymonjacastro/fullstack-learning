import { useState } from 'react'

export const Message = () => {
  const [message, setMessage] = useState('Hello World!')

  return (
    <>
      <div>{message}</div>
      <button onClick={() => setMessage('Its me')}>Click me!</button>
    </>
  )
}
