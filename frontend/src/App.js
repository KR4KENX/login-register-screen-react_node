import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css';
import axios from 'axios'
import Login from './Login'
import Register from './Register'
import Home from './Home';

function App() {
  const [user, setUser] = useState('')
  const location = useLocation()

  useEffect(() => {
    axios.get('http://localhost:8080/auth/', { withCredentials: true }).then((e) => setUser(e.data))
  }, [location.pathname])

  const logout = () => {
    axios.get('http://localhost:8080/auth/logout', { withCredentials: true }).then((e) => console.log(e))
    setUser('')
  }

  return (
    <div>
      <nav className='d-flex justify-content-between align-items-center bg-dark'>
        <ul>
          <li className='link-primary mx-3'><Link to='/'>Home</Link></li>
          <li className='link-primary mx-3'><Link to='/login'>Login</Link></li>
          <li className='link-primary mx-3'><Link to='/register'>Register</Link></li>
        </ul>
        <div className='d-flex flex-row align-items-center'>
          <h4 className='link-light mx-2'>{user === '' ? "You are not logged in!" : "Now logged: " + user }</h4>
          <p onClick={logout} className='link-secondary fs-2 mx-3'>Logout</p>
        </div>
      </nav>
      <Routes>
        <Route exact path='/' element={<Home isLogged={user} setUser={setUser} />}/>
        <Route path='/login' element={<Login setUser={setUser} />}/>
        <Route path='/register' element={<Register setUser={setUser} />}/>
      </Routes>
    </div>
  );
}

export default App;
