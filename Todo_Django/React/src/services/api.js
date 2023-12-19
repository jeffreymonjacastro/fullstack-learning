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

export const createProject = async (title, description) => {
  try {
    const res = await fetch(`${BACKEND_URL}/projects/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
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

export const getTasks = async (project_id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/tasks/${project_id}`, {
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