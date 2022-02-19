import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
  
      <Router>
      
      <div className="container">
      <Header/>
        <Routes>
          <Route exact path='/' element = {< Home/>}/>
          <Route exact path='/login' element = {< Login/>}/>
          <Route exact path='/register' element = {< Register/>}/>

       
        </Routes>
      </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;