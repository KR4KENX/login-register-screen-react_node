import { useState } from 'react'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedInVisibilityClass, setLoggedInVisibilityClass] = useState('invisible')
    const [invalidDataVisibilityClass, setInvalidDataVisibilityClass] = useState('invisible')

    const submitLoginData = (e) => {
        e.preventDefault()
        const dataObj = {email: email, password: password}

        axios.post('http://localhost:8080/auth/login', dataObj)
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
    <main>
        <form>
          <h1>Login</h1>
          <input type='text' value={email} onInput={(event) => {setEmail(event.target.value)}} placeholder='Enter your email'></input>
          <input type='password' value={password} onInput={(event) => {setPassword(event.target.value)}} placeholder='Enter your password'></input>
          <input type='button' value='Login' onClick={(e) => submitLoginData(e)} />
          <h2 className={loggedInVisibilityClass}>Logged in!</h2>
          <h2 className={invalidDataVisibilityClass}>Invalid data</h2>
        </form>
      </main>
  )
}

export default Login
