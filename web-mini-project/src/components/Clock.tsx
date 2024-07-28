import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faClockRotateLeft, 
  faStopwatch } from '@fortawesome/free-solid-svg-icons';
import '../scss/pages/clock.scss'

const DigitalClock = () => {
  const [time, setTime] = useState('')
  const [vamPm, setAmPm] = useState('')

  const getCurrentDate = () => {
    const currentDate = new Date(), //Coma
    options: any = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }

    return currentDate.toLocaleDateString('es', options)
  }

  const formatTime = (time: number): string | number => {
    return time < 10 ? `0${time}` : time
  }

  const getCurrentTime = () => {
    const currentTime = new Date(),
    hours = currentTime.getHours(),
    minutes = formatTime(currentTime.getMinutes()),
    seconds = formatTime(currentTime.getSeconds()),
    formatHours = formatTime(hours > 12 ? hours - 12 : hours)

    amPm(hours)

    return `${formatHours}:${minutes}:${seconds}`
  }

  const amPm = (hours: number) => {
    setAmPm( (hours < 12) || (hours == 24)  ? 'AM' : 'PM' )
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="clock-digital">

      <p className="clock-digital__date">{ getCurrentDate() }</p>
      <p className="clock-digital__time">{ time }<span>{ vamPm }</span></p>

    </section>
  )
}

export const Clock = () => {
  return (
    <div className="clock">
      <main className='clock-main'>
        <a className="back" href="/">
          &#x2190; Back
        </a>
        
        <aside className="clock-container">
          <DigitalClock />
        </aside>

        <aside className="clock-modalities">
          <div className="clock-type"><FontAwesomeIcon icon={faClock} /></div>
          <div className="clock-type"><FontAwesomeIcon icon={faStopwatch} /></div>
          <div className="clock-type"><FontAwesomeIcon icon={faClockRotateLeft} /></div>
        </aside>
      </main>
    </div>
  )
}
