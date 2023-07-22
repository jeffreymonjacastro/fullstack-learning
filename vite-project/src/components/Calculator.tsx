import { useState } from 'react'
import '../scss/pages/calculator.scss'

export const Calculator = () => {
  const [backgroundOne, setBackgroundOne] = useState('#282828')
  const [backgroundTwo, setBackgroundTwo] = useState('#323232')
  const [backgroundThree, setBackgroundThree] = useState('#474747')
  const [textColor, setTextColor] = useState('#ffffff')

  const lightTheme = () => {
    setBackgroundOne('#ffffff')
    setBackgroundTwo('#eaeaea')
    setBackgroundThree('#cacaca')
    setTextColor('#000000')
  }

  const darkTheme = () => {
    setBackgroundOne('#282828')
    setBackgroundTwo('#323232')
    setBackgroundThree('#474747')
    setTextColor('#ffffff')
  }

  return (
    <main 
      className='calculator-main' 
      style={{ background: backgroundOne, color: textColor }}>
      <aside className="calculator-container">
        <h2> Calculadora </h2>
        <section className="calculator-theme">
          <div 
            className="calculator-theme__light"
            style = {{ background: backgroundThree }}
            onClick={ lightTheme }
          >Light</div>
          <div 
            className="calculator-theme__dark"
            style = {{ background: backgroundThree }}
            onClick={ darkTheme }
          >Dark</div>
        </section>

        <section 
          className="calculator-calculadora"
          style = {{ background: backgroundTwo }}>
          <div className="calculator-screen" style = {{ background: backgroundThree, borderColor: backgroundOne }}>
            <p className="calculator-screen__operation">0</p>
            <p className="calculator-screen__result">0</p>
          </div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>C</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>&#x2190;</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>%</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>7</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>8</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>9</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>x</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>4</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>5</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>6</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>-</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>1</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>2</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>3</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>+</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>0</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>.</div>
          <div className="calculator-button" style = {{ background: backgroundThree }}>=</div>
        </section>
      </aside>
    </main>
  )
}
