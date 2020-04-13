const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
require('dotenv').config()

const authCtrl = require('./controllers/authCtrl')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

massive({
    connectionString: CONNECTION_STRING, 
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
}).catch(err => console.log('cannot connect to db', err))

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie : {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

//AUTH//
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`))