import { useState } from 'react'
import '../scss/pages/calculator.scss'
import { parse } from '@fortawesome/fontawesome-svg-core'

export const Calculator = () => {
  const [backgroundOne, setBackgroundOne] = useState('#282828')
  const [backgroundTwo, setBackgroundTwo] = useState('#323232')
  const [backgroundThree, setBackgroundThree] = useState('#474747')
  const [textColor, setTextColor] = useState('#ffffff')

  const [operation, setOperation] = useState('')
  const [result, setResult] = useState('')
  const [historial, setHistorial] = useState('')

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

  const calculate = () => {
    const [numberOne, operation, numberTwo] = historial.split(' ')
    let result = 0

    switch (operation) {
      case '+':
        result = parseFloat(numberOne) + parseFloat(numberTwo)
        break
      case '-':
        result = parseFloat(numberOne) - parseFloat(numberTwo)
        break
      case '*':
        result = parseFloat(numberOne) * parseFloat(numberTwo)
        break
      case '/':
        result = parseFloat(numberOne) / parseFloat(numberTwo)
        break
      default:
        break
    }

    setResult(result.toString())
  }

  return (
    <main 
      className='calculator-main' 
      style={{ background: backgroundOne, color: textColor }}>
      <a className="back" href="/">
        &#x2190; Back
      </a>

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
            <p className="calculator-screen__historial">{ historial }</p>
            <p className="calculator-screen__result"> { result } </p>
          </div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult('')
              setHistorial('')
            }}
          >C</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result.slice(0, -1))
              setHistorial(historial.slice(0, -1))
            }}
          >&#x2190;</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setOperation('/')
              setHistorial(historial + ' / ')
              setResult('')
            }}
          >/</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '7')
              setHistorial(historial + '7')
            }}
          >7</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '8')
              setHistorial(historial + '8')
            }}
          >8</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '9')
              setHistorial(historial + '9')
            }}  
          >9</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setOperation('*')
              setHistorial(historial + ' * ')
              setResult('')
            }}
          >x</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '4')
              setHistorial(historial + '4')
            }} 
          >4</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '5')
              setHistorial(historial + '5')
            }} 
          >5</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '6')
              setHistorial(historial + '6')
            }} 
          >6</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setOperation('-')
              setHistorial(historial + ' - ')
              setResult('')
            }}
          >-</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '1')
              setHistorial(historial + '1')
            }} 
          >1</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '2')
              setHistorial(historial + '2')
            }} 
          >2</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '3')
              setHistorial(historial + '3')
            }} 
          >3</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setOperation('+')
              setHistorial(historial + ' + ')
              setResult('')
            }}
          >+</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '0')
              setHistorial(historial + '0')
            }} 
          >0</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick = {() => {
              setResult(result + '.')
              setHistorial(historial + '.')
            }} 
          >.</div>
          <div 
            className="calculator-button" 
            style = {{ background: backgroundThree }}
            onClick={ calculate }
          >=</div>
        </section>
      </aside>
    </main>
  )
}
