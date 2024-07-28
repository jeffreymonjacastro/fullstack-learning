import { Calendar } from "./components/Calendar";
import { Home } from "./components/Home";
import { Calculator } from "./components/Calculator";
import { Urlshortener } from "./components/Urlshortener";
import { Clock } from "./components/Clock";
import { TodoList } from "./components/TodoList";
import { PassworGen } from "./components/PassworGen";
import { LogReg } from "./components/LogReg";
import { ImageUpload } from "./components/ImageUpload";
import { UsingApis } from "./components/UsingApis";
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
          <Route path="/clock" element={<Clock />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/password-generator" element={<PassworGen />} />
          <Route path="/login-register" element={<LogReg />} />
          <Route path="/image-upload" element={<ImageUpload />} />
          <Route path="/using-apis" element={<UsingApis />} />
          <Route path='*' element={<h1> Page not found :C </h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
