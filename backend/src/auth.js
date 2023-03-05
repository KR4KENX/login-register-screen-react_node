const { Router } = require('express')
const router = Router()

const users = [
    {
        email: 'user0@example.com',
        password: 'abc123'
    },
]

router.post('/login', (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        console.log('missing req body')
        res.sendStatus(500)
    }

    const searchUser = users.find((element) => {
        if(element.email === email && element.password === password){
            return true
        }
    })

    const isValid = searchUser != undefined ? res.send('Success') : res.send('Invalid')
})

router.post('/register', (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        console.log('missing req body')
        res.sendStatus(500)
        return
    }

    const serchEmail = users.find((element) => {
        if(element.email === email){
            return true
        }
    })

    const isUnique = serchEmail == undefined ? true : false

    if(isUnique === true){
        users.push({ email: email, password: password})
        console.log(users)
        res.send('Success')
    }
    else{
        res.send('Not unique email')
    }
    
})

module.exports = router