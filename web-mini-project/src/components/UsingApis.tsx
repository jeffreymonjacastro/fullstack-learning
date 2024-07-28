import { useEffect, useState } from 'react'
import { getCatFact } from '../services/api'
import '../scss/pages/using-apis.scss'

const CatFact = () => {
  const [fact, setFact] = useState('')
  
  const getFact = async () => {
    const catFact = await getCatFact()
    setFact(catFact.text)
    console.log(catFact.text);
  }

  useEffect(() => {
    getFact() 

    return () => {}
  }, [])

  return (
    <div className="cat-fact">
      <h3>Cat-Fact</h3>
      <p> { fact } </p>
    </div>
  )
}

export const UsingApis = () => {
  const [showAPI, setShowAPI] = useState(false)


  return (
    <main className="apis-main">
      <article className="apis-container">
        <h2>Using APIS</h2>
        <section className="apis-gallery">
          <div 
            className="apis-gallery__item"
            onClick={() => setShowAPI(!showAPI)}  
          >
            <h3>Cat-Fact</h3>
            <p>A Random quote, fact and curiosity about cats</p>
          </div>

          <div className="apis-gallery__item">
            <h3>Rick & Morty</h3>
            <p>Look for all the characters and more</p>
          </div>

          <div className="apis-gallery__item">
            <h3>Weather App</h3>
            <p>Using OpenWeather API</p>
          </div>

          { showAPI && <CatFact /> }
        </section>
      </article>
      
    </main>
  )
}
