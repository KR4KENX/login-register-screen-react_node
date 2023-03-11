import { useEffect } from 'react'
import axios from 'axios'

function Home(props) {
    const HomeContent = () => {
        return(
            <div className='mt-4'>
                <h1>Home</h1>
                <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, et.</p>
            </div>
        )
    }
  return (
    <main className='d-flex flex-row justify-content-center'>
      {props.isLogged == '' ? <h2 className='mt-4'>You must be logged in to see this page</h2> : HomeContent()}
    </main>
  )
}

export default Home
