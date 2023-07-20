import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendar, 
  faCalculator, 
  faLink,
  faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../scss/pages/home.scss'


export const Home = () => {


  return (
    <main className='home-main'>
      <article className='home-container'>
        <h2>My Web Mini Proyects</h2>

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
      </article>
    </main>
  )
}
