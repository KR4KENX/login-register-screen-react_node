const { Router } = require('express')
const User = require('../database/Schemas/User')

const router = Router()

router.post('/create', async (req, res) => {
    const { ToDo } = req.body
    const email = req.session.userid

    const userDB = await User.findOne({ email })
    if(!userDB){
        res.sendStatus(404)
    }
    else{
        await userDB.updateOne({$push: {ToDoList: ToDo}})
        res.sendStatus(200)
    }
})

router.delete('/:task', async (req, res) => {
    const task = req.params.task
    const email = req.session.userid

    const userDB = await User.findOne({ email })
    if(!userDB) return res.send(400)
    console.log(userDB.ToDoList)

    await userDB.updateOne({$pull: {ToDoList: task}})

    res.send(200)
})

router.get('/show-list', async (req, res) => {
    const email = req.session.userid

    const userDB = await User.findOne({ email })
    if(!userDB) res.sendStatus(403)

    else{
        res.send(userDB.ToDoList)
    }
})

module.exports = router