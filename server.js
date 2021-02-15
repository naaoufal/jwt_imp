require('dotenv').config()
const e = require('express')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

const members = [
    {
        "firstname" : "naoufal",
        "lastname" : "benmansour"
    },
    {
        "firstname" : "first1",
        "lastname" : "last1"
    }
]

app.use(express.json())

app.get('/members', authToken, (req, res) => {

    return res.json(members.filter(member => member.firstname === req.user.name))

})

app.post('/login', (req, res) => {

    const firstname = req.body.firstname
    const user = {name : firstname}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
    res.json({accessToken : accessToken})

})

function authToken (req, res, next) {
    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(' ')[1]

    if(token == null){
        return res.sendStatus(403)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

//console.log(members)

app.listen(3000)