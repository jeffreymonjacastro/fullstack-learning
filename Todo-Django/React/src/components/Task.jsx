import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import '../css/Task.css'

export const Task = ({ id, title, description }) => {
  return (
    <div className="task" id={id}>
      <p>{title}</p>
      <p>{description}</p>
      <input 
        type="checkbox" 
        // onClick={}
      />
      <div
        className="task-edit"
        // onClick={}
      >
        <FontAwesomeIcon icon={faPencil} style={{color: "#757575",}} />
      </div>
      <div 
        className="task-delete"
        // onClick={}
      >
        <FontAwesomeIcon icon={faTrash} style={{color: "#757575",}} />
      </div>
    </div>
  )
}
