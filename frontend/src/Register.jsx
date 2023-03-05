import { useState } from 'react'
import axios from 'axios'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerSucces, setRegisterSucces] = useState('invisible')
    const [notUniqueEmail, setNotUniqueEmail] = useState('invisible')

    const submitLoginData = (e) => {
        e.preventDefault()
        const dataObj = {email: email, password: password}
        console.log(dataObj)

        axios.post('http://localhost:8080/auth/register', dataObj)
        .then((e) => toggleInfoVisibility(e.data))
    }

    const toggleInfoVisibility = (response) => {
        if(response === 'Success'){
            setRegisterSucces('')
            setNotUniqueEmail('invisible')
        }
        else{
            setNotUniqueEmail('')
            setRegisterSucces('invisible')
        }
    }

  return (
    <main>
        <form>
          <h1>Register</h1>
          <input type='text' value={email} onInput={(event) => {setEmail(event.target.value)}} placeholder='Enter your email'></input>
          <input type='password' value={password} onInput={(event) => {setPassword(event.target.value)}} placeholder='Enter your password'></input>
          <input type='button' onClick={(event) => submitLoginData(event)} value='Register' />
          <h2 className={registerSucces}>Registered succesfuly!</h2>
          <h2 className={notUniqueEmail}>We already have account registered on this email</h2>
        </form>
      </main>
  )
}

export default Register
