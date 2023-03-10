import { useEffect, useState } from 'react';
import { Routes, Route, Link} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import Login from './Login'
import Register from './Register'

function App() {
  const [user, setUser] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8080/auth/check-login', { withCredentials: true }).then((e) => setUser(e.data))
  }, [])

  console.log(user)

  return (
    <div>
      <nav className='d-flex justify-content-between align-items-center bg-dark'>
        <ul>
          <li className='link-primary'><Link to='/login'>Login</Link></li>
          <li className='link-primary mx-3'><Link to='/register'>Register</Link></li>
        </ul>
        <h4 className='link-light mx-3'>{user === '' ? "You are not logged in!" : "Now logged: " + user }</h4>
      </nav>
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />}/>
        <Route path='/register' element={<Register setUser={setUser} />}/>
      </Routes>
    </div>
  );
}

export default App;
