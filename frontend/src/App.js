import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import NewTicket from './pages/NewTicket'
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ticket from './pages/Ticket'
import Tickets from './pages/Tickets'

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
          <Route exact path='/new-ticket' element = {< PrivateRoute/>}>
            <Route exact path='/new-ticket' element = {< NewTicket/>}/>
          </Route>
          <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets' element={<Tickets />} />
            </Route>
            <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
              <Route path='/ticket/:ticketId' element={<Ticket />} />
            </Route>
          
          
          
        </Routes>
      </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
