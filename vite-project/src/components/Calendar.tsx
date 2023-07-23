import { useEffect, useState } from 'react'
import '../scss/pages/calendar.scss'

const Day = (
    { id, num, clase, month, year, function: setSelectDate }: 
    { 
      id: number; 
      num: number; 
      clase: string, 
      month: number, 
      year: number, 
      function: any 
    }
  ) => {

  return (
    <div 
      id = {id.toString()}
      className={`calendar__item ${clase}`}
      onClick = {() => {setSelectDate(new Date(year, month, num))}}>
      {num}
    </div>
    
  )
}

const OtherDay = ({num, clase}: {num: number, clase: string}) => {
  return (
    <div className={`calendar__item ${clase}`}>
      {num}
    </div>
  )
}

export const Calendar = () => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December']
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const currentDate = new Date()

  const [date, setDate] = useState(new Date())
  const [days, setDays] = useState([] as JSX.Element[])
  const [selectDate, setSelectDate] = useState(new Date())
  const [showMonthSelector, setShowMonthSelector] = useState(false)
  const [showYearSelector, setShowYearSelector] = useState(false)


  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()

  // Writes the correct number of days of the month in the calendar
  const writeMonth = (month: number) => {
    let num = 32;
    const daysArray: JSX.Element[] = [];

    for (let i = startDay(); i > 0; i--) {
      daysArray.push(
        <OtherDay 
          key={num} 
          num={getTotalDays(month-1)-(i-1)}
          clase="calendar__last-days"
        />
      );
      num++
    }
    
    for (let i = 1; i <= getTotalDays(month); i++) {
      if (i === day && month === currentDate.getMonth() && year === currentDate.getFullYear())
        daysArray.push(
          <Day 
            id={i} 
            key={i} 
            num={i} 
            clase="calendar__today"
            month={month}
            year={year}
            function={setSelectDate}
          />
        );
      else
        daysArray.push(
          <Day 
            id={i} 
            key={i} 
            num={i} 
            clase=""
            month={month}
            year={year}
            function={setSelectDate}
          />
        );
    }

    for (let i = 1; i <= (6-endDay()); i++) {
      daysArray.push(
        <OtherDay 
          key={num} 
          num={i}
          clase="calendar__next-days"
        />  
      );
      num++
    }

    setDays(daysArray)
  };

  // Returns the total days of the month
  const getTotalDays = (month: number) => {
    if (month === -1)
      month = 11
      
    if (month % 2 === 0 || month === 7)
      return 31
    else if (month === 1)
      return isLeap(year) ? 29 : 28
    else
      return 30
  }

  // Returns true if the year is leap
  const isLeap = (year: number): boolean => {
    return (year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)
  }  

  // Returns where the week start
  const startDay = (): number => {
    let start = new Date(year, month, 1)

    return ((start.getDay()-1 === -1) ? 6 : start.getDay() -1 )
  }

  // Returns where the week ends
  const endDay = (): number => {
    let end = new Date(year, month, getTotalDays(month))   

    return ((end.getDay()-1 === -1) ? 6 : end.getDay() -1 )
  }

  // Is used to avoid errors when clicking the previous month
  const lastMonth = () => {    
    if (month !== 0) {
      month--
    } else {
      month = 11
      year--
    }

    setNewDate()
  }

  // Is used to avoid errors when clicking the next month
  const nextMonth = () => {
    if (month !== 11) {
      month++
    } else {
      month = 0
      year++
    }

    setNewDate()
  }

  const setNewDate = () => {
    let newDate = new Date(year, month, day)
    setDate(newDate)

    writeMonth(month)
  }

  useEffect(() => {
    writeMonth(month)
  }, [])

  return (
    <main className="calendar-main">
      <a className="back" href="/">
        &#x2190; Back
      </a>

      <article className="calendar-container">
        <h2> Calendario Interactivo </h2>

        <section className="calendar-calendario">
          <div className="calendar__info">
            <div 
              className="calendar__prev"
              onClick={lastMonth}  
            >&#9664;</div>
            
            <div className="calendar__month">
              <div onClick={() => setShowMonthSelector(!showMonthSelector)}>
                { monthNames[month] }
              </div>

              { showMonthSelector && 
                <div className="calendar-selector__month"> 
                  {monthNames.map((m, index) => {
                    if (m === monthNames[date.getMonth()])
                      return (
                        <div 
                          key={index} 
                          className="calendar-this"
                          onClick={() => {
                            month = index
                            setNewDate()
                            setShowMonthSelector(!showMonthSelector)
                          }}
                        >{m}</div>
                      )
                    else
                      return (
                        <div 
                          key={index}
                          onClick={() => {
                            month = index
                            setNewDate()
                            setShowMonthSelector(!showMonthSelector)
                          }}
                        >{m}</div>
                      )
                  })}
                </div> }
            </div>
            
            <div className="calendar__year">
              <div onClick={() => setShowYearSelector(!showYearSelector)}>
                { year }
              </div>

              { showYearSelector && 
                <div className="calendar-selector__year"> 
                  { Array.from(Array(100), (e, i) => i + year-99)
                    .reverse()
                    .map((y, index) => {
                      if (y === date.getFullYear())
                        return (
                          <div 
                            key={index} 
                            className="calendar-this"
                            onClick={() => {
                              year = year - index
                              setNewDate()
                              setShowYearSelector(!showYearSelector)
                            }}
                          >{y}</div>
                        )
                      else
                        return (
                          <div 
                            key={index}
                            onClick={() => {
                              year = year - index
                              setNewDate()
                              setShowYearSelector(!showYearSelector)
                            }}
                          >{y}</div>
                        )
                  })}
                </div> }
            </div>

            <div 
              className="calendar__next"
              onClick={nextMonth}
            >&#9654;</div>
          </div>

          <div className="calendar__week">
            <div className="calendar__item"><b>M</b></div>
            <div className="calendar__item"><b>T</b></div>
            <div className="calendar__item"><b>W</b></div>
            <div className="calendar__item"><b>T</b></div>
            <div className="calendar__item"><b>F</b></div>
            <div className="calendar__item"><b>S</b></div>
            <div className="calendar__item"><b>S</b></div>
          </div>

          <div className="calendar__dates"> { days } </div>
        </section>

        <section className='calendar-date'>
          <div>
            {weekDays[selectDate.getDay()-1 !== -1 ? selectDate.getDay()-1 : 6]} 
          </div>
          <div>
            {selectDate.getDate()} / 
            {monthNames[selectDate.getMonth()]} / 
            {selectDate.getFullYear()}
          </div>
        </section>
      </article>
    </main>
  )
}
