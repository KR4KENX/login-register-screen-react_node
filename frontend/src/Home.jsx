import axios from 'axios'
import { useEffect, useState } from 'react'
import Poster from './Poster'

function Home(props) {
    const [userList, setUserList] = useState('')
    const [newTask, setNewTask] = useState('')
    const [reloadTasks, setReloadTasks] = useState(false)

    useEffect(() => {
      axios.get('http://localhost:8080/todo/show-list', { withCredentials: true })
      .then((e) => setUserList(() => [e.data]))
    }, [reloadTasks])

    const submitNewTask = async (event) => {
      event.preventDefault()

      const dataObj = {ToDo: newTask}
      const instance = axios.create({withCredentials: true})
      await instance.post('http://localhost:8080/todo/create', dataObj)
      setReloadTasks(prev => !prev)
      setNewTask('')
    }

    const deleteTask = async (event, task) => {
      event.preventDefault()

      const instance = axios.create({withCredentials: true})
      await instance.delete(`http://localhost:8080/todo/${task}`)
      setReloadTasks(prev => !prev)
    }

    const HomeContent = () => {
        return(
          <>
            <div className='mt-2 text-center w-75'>
              <div id='toDoContainer'>
                <div id='addTask-container' className='d-flex flex-column align-items-center'>
                  <h2 className='fs-1 my-4 text-uppercase'>Add new task</h2>
                  <div className='d-flex align-items-baseline'>
                    <input value={newTask} onInput={(e) => setNewTask(e.target.value)} className='fs-3 form-control' type='text' placeholder='Type...' />
                    <button onClick={(e) => submitNewTask(e)} className='btn btn-primary fs-2 mx-3'>Add</button>
                  </div>
                </div>
                <div id='list-container' className='d-flex flex-column align-items-center w-100'>
                  <h2 className='fs-1 my-4 text-uppercase'>Your ToDo</h2>
                  <ul className='list-group w-75'>
                    {userList[0] === undefined ? 'You havent got any task!' : userList[0].map((current, key) => {
                      return (
                        <li className='list-group-item fs-3 d-flex justify-content-between'>
                          <span key={key}>{current}</span>
                          <button onClick={(e) => deleteTask(e, current)} className='btn btn-danger'>X</button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className='w-75 text-center'>
              <Poster/>
            </div>
            </>
        )
    }
  return (
    <main className='d-flex flex-row justify-content-center'>
      {props.isLogged === '' ? <h2 className='mt-4'>You must be logged in to see this page</h2> : HomeContent()}
    </main>
  )
}

export default Home
