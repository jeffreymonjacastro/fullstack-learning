import { Calendar } from "./components/Calendar";
import { Home } from "./components/Home";
import { Calculator } from "./components/Calculator";
import { Urlshortener } from "./components/Urlshortener";
import { 
	BrowserRouter as Router, 
	Routes, 
	Route } from 'react-router-dom';
import './scss/App.scss';

function App(){
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/url-shortener" element={<Urlshortener />} />
          <Route path='*' element={<h1> Page not found :C </h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
