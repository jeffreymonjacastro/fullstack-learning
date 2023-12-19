const BACKEND_URL = 'http://127.0.0.1:8000'

let _csrfToken = null

export const getCsrfToken = async () => {
  if (_csrfToken === null) {
    const response = await fetch(`${BACKEND_URL}/csrf/`, {
      credentials: 'include',
    })

    const data = await response.json()
    _csrfToken = data.csrfToken
  }
  console.log(_csrfToken);
  return _csrfToken
}

export const testRequest = async (method) => {
  const response = await fetch(`${BACKEND_URL}/ping/`, {
    method: method,
    headers: (
      method === 'POST' 
        ? {'X-CSRFToken': await getCsrfToken()} 
        : {}
    ),
    credentials: 'include',
  })

  const data = await response.json();
  return data.result;
}

// GET PROJECTS
export const getProjects = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/projects/`, {
      method: 'GET',
      credentials: 'include',
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

// POST PROJECTS
export const createProject = async (datos) => {
  try {
    const res = await fetch(`${BACKEND_URL}/projects/`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(datos)
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

// DELETE PROJECTS
export const deleteProject = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/project/${id}`, {
      method: 'DELETE',
      credentials: 'include',
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

// GET TASKS
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