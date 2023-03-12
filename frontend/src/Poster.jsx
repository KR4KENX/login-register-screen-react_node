import { useState, useEffect } from 'react'
import axios from 'axios'

function Poster() {
    const [userPoster, setUserPoster] = useState('')
    const [newPost, setNewPost] = useState('')
    const [reloadTasks, setReloadTasks] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/poster/', { withCredentials: true })
        .then((e) => setUserPoster(() => e.data))

        console.log(userPoster)
      }, [reloadTasks])

    const addNewPost = async (event) => {
        event.preventDefault()

      const dataObj = {post: newPost}
      const instance = axios.create({withCredentials: true})
      await instance.post('http://localhost:8080/poster/create', dataObj)
      setReloadTasks(prev => !prev)
      setNewPost('')
    }

  return (
    <>
        <h2 className='fs-1 my-4 text-uppercase'>Add new post</h2>
        <div className='d-flex align-items-baseline w-50 m-auto'>
            <input value={newPost} onInput={(e) => setNewPost(e.target.value)} className='fs-3 form-control' type='text' placeholder='Post something...' />
            <button onClick={(e) => addNewPost(e)} className='btn btn-primary fs-2 mx-3'>Add</button>
        </div>
      <h2 className='fs-1 my-4 text-uppercase'>Your Poster</h2>
            <ul className='list-group my-3'>
                {userPoster === '' ? 'You havent got any posts!' : userPoster.map((current, key) => {
                return (
                    <div className='list-group-item w-75 mx-auto' key={key}>
                    <h3 className='d-inline fs-3'>{current.creator}</h3>
                    <span className='d-inline fs-4 mx-2'>{current.date}</span>
                    <p className='fs-2 my-4'>{current.post}</p>
                    </div>
                )
            })}
            </ul>
    </>
  )
}

export default Poster
