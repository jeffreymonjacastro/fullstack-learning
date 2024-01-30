import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { 
  useState, 
  useEffect,
  useRef } from 'react'
import { Task } from './Task'
import { getTasks, deleteProject } from '../services/api.js'
import '../css/Project.css'


export const Project = ({ id, title, description }) => {
  const [showTask, setShowTasks] = useState(true)
  const [Tasks, setTasks] = useState([])
  const tasksRef = useRef(null)
  const taskBtnRef = useRef(null)

  const callgetTasks = async (project_id) => {
    const response = await getTasks(project_id)
    setTasks(response || [])
  }

  const calldeleteProject = async (project_id) => {
    const response = await deleteProject(project_id)
    alert(response.result)
    window.location.reload()
  }

  const showTasks = () => {
    setShowTasks((prevShow) => {
      if (prevShow) {
        tasksRef.current.style.display = 'block';
        taskBtnRef.current.innerHTML = 'Tasks ▲';
      } else {
        tasksRef.current.style.display = 'none';
        taskBtnRef.current.innerHTML = 'Tasks ▼';
      }

      return !prevShow;
    });
  };

  useEffect(() => {
    showTasks()

    taskBtnRef.current.addEventListener('click', showTasks);

    return () => {
      taskBtnRef.current.removeEventListener('click', showTasks);
    };
  }, []);

  return (
    <section className="project" id={id}>
      <div className="project-image">image</div>

      <div className="project-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <button 
          className="project-tasks-btn" 
          ref={taskBtnRef}
          onClick={ () => callgetTasks(id) }
        >
          Tasks ▼
        </button>

        <button 
          className="project-tasks-add" 
          // ref={taskBtnRef}
          // onClick={ () => callgetTasks(id) }
        >
          Add Task +
        </button>
      </div>

      <div className="project-tasks" ref={tasksRef}>
        <div className="task-headers">
          <p>Task</p>
          <p>Description</p>
          <p>Done</p> 
          <p>Edit</p>
          <p>Delete</p>
        </div>
        <hr/>
        {
          Tasks?.map((task) => (
            <Task
              key={task.pk}
              id={`project-${id}-task-${task.pk}`}
              title={task.fields.title}
              description={task.fields.description}
            />
          ))
        }
      </div>

      <div
        className="project-delete"
        onClick={ () => calldeleteProject(id) }
      >
        <FontAwesomeIcon icon={faTrash} style={{color: "#707070",}} />
      </div>

      <div
        className="project-edit"
        // onClick={}
      >
        <FontAwesomeIcon icon={faPencil} style={{color: "#707070",}} />
      </div>
    </section>
  );
};
