import { useState, useEffect } from 'react'
import { getProjects, createProject } from '../services/api.js'
import { Project } from './Project'
import '../css/Todo.css'


export const Todo = () => {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showAddProject, setShowAddProject] = useState(false)

  const callcreateProject = async (project) => {
    const response = await createProject(project)
    console.log(response)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    window.location.reload()
  }

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
        <button 
          className="add-project"
          onClick={ () => setShowAddProject((prevShow) => !prevShow)}
        >
          + Add Project
        </button>
      </div>

      <div className="projects">
        { showAddProject &&
          <div className="project">
            <div className="project-image">image</div>
            <form 
              className='project-form'
              action="" 
              method="post" 
              id='forms'
              onSubmit={handleSubmit}
            >
              <input 
                className='project-form-title'
                type="text" 
                name="title" 
                id="title" 
                placeholder='Title'
                required
                onChange = { (e) => setTitle(e.target.value) }
              />
              <textarea 
                className='project-form-description'
                name="description" 
                id="description"
                placeholder='Description'
                required
                onChange = { (e) => setDescription(e.target.value) }
              ></textarea>

              <button
                onClick={ () => callcreateProject({ title, description })}
              >Create</button>
            </form>
          </div>
        }
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
