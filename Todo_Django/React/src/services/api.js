const BACKEND_URL = 'http://127.0.0.1:8000'

export const getProjects = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/projects/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error('Something went wrong')
    }

    const data = await res.json()
    return data

  } catch (error) {
    console.error('Error al realizar la solicitud:', error.message);
    throw error;
  }
}

export const getTasks = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/tasks/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error('Something went wrong')
    }

    const data = await res.json()
    return data

  } catch (error) {
    console.error('Error al realizar la solicitud:', error.message);
    throw error;
  }
}