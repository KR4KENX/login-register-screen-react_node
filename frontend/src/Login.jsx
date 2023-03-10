import { useState, useEffect } from 'react'
import axios from 'axios'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedInVisibilityClass, setLoggedInVisibilityClass] = useState('invisible')
    const [invalidDataVisibilityClass, setInvalidDataVisibilityClass] = useState('invisible')

    useEffect(() => {
      axios.get('http://localhost:8080/auth/check-login', { withCredentials: true }).then((e) => props.setUser(e.data))
    }, [])

    const submitLoginData = (e) => {
        e.preventDefault()
        const dataObj = {email: email, password: password}
        const instance = axios.create({withCredentials: true})
        instance.post('http://localhost:8080/auth/login', dataObj)
        .then((e) => toggleInfoVisibility(e.data))
    }

    const toggleInfoVisibility = (response) => {
        if(response === 'Success'){
            setLoggedInVisibilityClass('')
            setInvalidDataVisibilityClass('invisible')
        }
        else{
            setInvalidDataVisibilityClass('')
            setLoggedInVisibilityClass('invisible')
        }
    }

  return (
    <main className='d-flex flex-column align-items-center'>
      <h1 className='mt-4'>Login</h1>
        <form>
          <div className='d-flex flex-column align-items-center'>
          <input className='mb-3 mt-4' type='text' value={email} onInput={(event) => {setEmail(event.target.value)}} placeholder='Enter your email'></input>
          <input className='mb-5 mt-3' type='password' value={password} onInput={(event) => {setPassword(event.target.value)}} placeholder='Enter your password'></input>
          <input className='btn btn-primary btn-lg btn-block' type='button' value='Login' onClick={(e) => submitLoginData(e)} />
          <h2 className='link-success mt-5 display-4' id={loggedInVisibilityClass}>Logged in!</h2>
          <h2 className='link-danger mt-5 display-4' id={invalidDataVisibilityClass}>Invalid data</h2>
          </div>
        </form>
      </main>
  )
}

export default Login
