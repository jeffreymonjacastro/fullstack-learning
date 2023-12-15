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

  const callgetTasks = async () => {
    const response = await getTasks()
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
        <button className="project-tasks-btn" ref={taskBtnRef}>
          Tasks ▼
        </button>
      </div>

      <div className="project-tasks" ref={tasksRef}>
        <div className="task-headers">
          <p>Task</p>
          <p>Description</p>
          <p>Done</p> 
        </div>
        <hr/>
        {
          Tasks?.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))
        }
      </div>
    </section>
  );
};
