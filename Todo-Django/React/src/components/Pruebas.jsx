import { useEffect } from 'react';
import { testRequest } from '../services/api.js';

export const Pruebas = () => {

  const callTestRequest = async (method) => {
    const response = await testRequest(method)
    console.log(response)
  }

  useEffect(() => {
    callTestRequest('GET')
    callTestRequest('POST')
  }, [])

  return (
  <div>
    <h1>Pruebas</h1>
    {/* <div>GET: {() => testRequest('GET')}</div>
    <div>POST: {() => testRequest('POST')}</div> */}
  </div>
  )
}
