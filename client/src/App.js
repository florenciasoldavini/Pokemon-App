import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Detail from './components/Detail';
import Form from './components/Form'; 
import UpdateForm from './components/UpdateForm';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/form" element={<Form/>}></Route>
        <Route path="/detail/:id" element={<Detail/>}></Route>
        <Route path="/update/:id" element={<UpdateForm/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
