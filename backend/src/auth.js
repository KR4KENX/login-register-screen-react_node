const { Router } = require('express')
const router = Router()
const { hashPassword, comparePassword } = require('../utils/helpers')

const users = [
]

router.get('/', (req, res) => {
    if(req.cookies.logged){
        res.send(req.cookies.logged)
    }
    else{
        res.send(null)
    }
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        console.log('missing req body')
        res.sendStatus(500)
    }

    const findUser = users.find((element) => {
        if(element.email === email){
            if(comparePassword(password, element.password)){
                return true
            }
        }
    })

    if(findUser){
        res.cookie("logged", email, {maxAge: 60000})
        res.send('Success')
    } 
    else{
        res.send('Invalid')
    }
})

router.post('/register', (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        console.log('missing req body')
        res.sendStatus(500)
    }

    const serchEmail = users.find((element) => {
        if(element.email === email){
            return true
        }
    })

    const isUnique = serchEmail == undefined ? true : false

    if(isUnique === true){
        users.push({ email: email, password: hashPassword(password)})
        console.log(users)
        res.cookie("logged", email, {maxAge: 60000})
        res.send('Success')
    }
    else{
        res.send('Not unique email')
    }
    
})

router.get('/logout', (req, res) => {
    res.clearCookie("logged")
    res.end()
    res.sendStatus(200)
})

module.exports = router