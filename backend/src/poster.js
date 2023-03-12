const { Router } = require('express')
const User = require('../database/Schemas/User')

const router = Router()

router.post('/create', async (req, res) => {
    const { post } = req.body
    const email = req.session.userid

    const userDB = await User.findOne({ email })
    if(!userDB){
        res.sendStatus(404)
    }
    else{
        await userDB.updateOne({$push: {Poster: post}})
        res.sendStatus(200)
    }
})

router.get('/', async(req, res) => {
    const allDB = await User.find()
    let allPosts = []

    allDB.forEach((current) => {
        if(current.Poster.length === 0) return

        else{
            current.Poster.forEach((currentPost) => {
                allPosts.push({creator: current.email, post: currentPost, date: current.createdAt.slice(0, 10)})
            })
        }
    })
    res.send(allPosts)
})

module.exports = router