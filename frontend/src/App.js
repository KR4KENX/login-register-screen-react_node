import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Login from './Login'
import Register from './Register'

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  );
}

export default App;
