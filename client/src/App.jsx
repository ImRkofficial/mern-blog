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
import AdminPrivateRoute from './components/AdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

function App() {

  return (
    <>
    <Router>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute/>}>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/update-post/:postId' element={<UpdatePost/>}/>
        </Route>
        <Route path='/projects' element={<Projets />} />
        <Route path='/post/:postSlug' element={<PostPage />} />

        <Route path="*" element={<NotFound/>} />
      </Routes>
      <FooterCom/>
    </Router>
      
    </>
  )
}

export default App
