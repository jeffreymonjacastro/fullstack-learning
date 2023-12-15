import { useState, useEffect } from 'react'
import { getProjects } from '../services/api.js'
import { Project } from './Project'
import '../css/Todo.css'


export const Todo = () => {
  const [projects, setProjects] = useState([])

  const callgetProjects = async () => {
    const response = await getProjects()
    setProjects(response || [])
  }

  useEffect(() => {
    callgetProjects()

    return () => {}
  }, [])

  return (
    <article className='todo'>
      <div className='title'>
        <h3>Projects</h3>
      </div>

      <div className="projects">
        {
          projects?.map((project) => (
            <Project
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
            />
          ))
        }
      </div>
    </article>
  )
}
