import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendar, 
  faCalculator, 
  faLink,
  faClock,
  faList,
  faLock,
  faRightToBracket,
  faImage,
  faGlobe,
  faPaintRoller,
  faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../scss/pages/home.scss'


export const Home = () => {


  return (
    <main className='home-main'>
      <h2>My Web Mini Proyects</h2>
      
      <article className='home-container'>

        <Link to={'/calendar'} className='home-section'>
          <FontAwesomeIcon icon={faCalendar} bounce />
          <h3>Calendar</h3>
        </Link>

        <Link to={'/calculator'} className='home-section'>
          <FontAwesomeIcon icon={faCalculator} bounce />
          <h3>Calculator</h3>
        </Link>

        <Link to={'/url-shortener'} className='home-section'>
          <FontAwesomeIcon icon={faLink} bounce />
          <h3>URL shortener</h3>
        </Link>

        <Link to={'/clock'} className='home-section'>
          <FontAwesomeIcon icon={faClock} bounce />
          <h3>Clock</h3>
        </Link>

        <Link to={'/todo-list'} className='home-section'>
          <FontAwesomeIcon icon={faList} bounce />
          <h3>To-do List</h3>
        </Link>

        <Link to={'/password-generator'} className='home-section'>
          <FontAwesomeIcon icon={faLock} bounce />
          <h3>Password Generator</h3>
        </Link>

        <Link to={'/login-register'} className='home-section'>
          <FontAwesomeIcon icon={faRightToBracket} bounce />
          <h3>Login/Register</h3>
        </Link>

        <Link to={'/image-upload'} className='home-section'>
          <FontAwesomeIcon icon={faImage} bounce />
          <h3>Image Upload</h3>
        </Link>

        <Link to={'/using-apis'} className='home-section'>
          <FontAwesomeIcon icon={faGlobe} bounce />
          <h3>Using APIs</h3>
        </Link>

        <Link to={'/draw-board'} className='home-section'>
          <FontAwesomeIcon icon={faPaintRoller} bounce />
          <h3>Draw Board</h3>
        </Link>

        <Link to={'/unicode-search'} className='home-section'>
          <FontAwesomeIcon icon={faSearch} bounce />
          <h3>Unicode Search</h3>
        </Link>

        {/* Landing Page  */}
        {/* CSS logo designs */}
        {/* React PDF */}

      </article>
    </main>
  )
}
