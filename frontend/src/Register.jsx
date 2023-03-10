import { useState, useEffect } from 'react'
import axios from 'axios'

function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerSucces, setRegisterSucces] = useState('invisible')
    const [notUniqueEmail, setNotUniqueEmail] = useState('invisible')

    useEffect(() => {
      axios.get('http://localhost:8080/auth/check-login', { withCredentials: true }).then((e) => props.setUser(e.data))
    }, [])
    
    const submitLoginData = (e) => {
        e.preventDefault()
        const dataObj = {email: email, password: password}
        const instance = axios.create({withCredentials: true})
        instance.post('http://localhost:8080/auth/register', dataObj)
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
    <main className='d-flex flex-column align-items-center'>
      <h1 className='mt-4'>Register</h1>
        <form>
          <div className='d-flex flex-column align-items-center'>
              <input className='mb-3 mt-4' type='email' value={email} onInput={(event) => {setEmail(event.target.value)}} placeholder='Enter your email'></input>
              <input className='mb-5 mt-3' type='password' value={password} onInput={(event) => {setPassword(event.target.value)}} placeholder='Enter your password'></input>
              <input className='btn btn-primary btn-lg btn-block' type='button' onClick={(event) => submitLoginData(event)} value='Register' />
          </div>
        </form>
        <h2 className='link-success mt-5 display-4' id={registerSucces}>Registered succesfuly!</h2>
          <h2 className='link-danger mt-5 display-4' id={notUniqueEmail}>We already have account registered on this email</h2>
      </main>
  )
}

export default Register
