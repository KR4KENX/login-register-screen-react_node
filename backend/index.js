const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('./src/auth')
const todoRouter = require('./src/todo')
const session = require('express-session')

require('./database/index')

const app = express()
app.use(cookieParser())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})
app.use(express.json())
app.use(session({
    secret: 'hojfsjafajqjwrojjoqnf',
    resave: false,
    saveUninitialized: false
})
)

app.use('/auth', authRouter)
app.use('/todo', todoRouter)

app.listen(8080, () => {
    console.log('server started on port 8080')
})