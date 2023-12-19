import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { 
  useState, 
  useEffect,
  useRef } from 'react'
import { Task } from './Task'
import { getTasks } from '../services/api.js'
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
        className="project-add-task"
        // onClick={}
      >
        <FontAwesomeIcon icon={faCirclePlus} style={{color: "#707070",}} />
      </div>
    </section>
  );
};
