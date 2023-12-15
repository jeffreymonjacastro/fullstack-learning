import '../css/Task.css'

export const Task = ({ id, title, description }) => {
  return (
    <div className="task" id={id}>
      <p>{title}</p>
      <p>{description}</p>
      <input type="checkbox" />
    </div>
  )
}
