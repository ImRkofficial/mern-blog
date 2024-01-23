import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from '../src/pages/Home';
import About from './pages/About';
import Projets from './pages/Projects';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import FooterCom from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/projects' element={<Projets />} />
      </Routes>
      <FooterCom/>
    </Router>
      
    </>
  )
}

export default App
