import express from 'express'
import bcrypt from 'bcryptjs' //Import the bcryptjs package
import jwt from 'jsonwebtoken' //Import the jsonwebtoken package
import db from '../db.js' //Import the database connection

const router = express.Router() //Creates a new router object

//Register a new user endpoint /auth/register
router.post('/register', (req, res) => {
    console.log('Register endpoint called')
    const {username, password} = req.body //Destructure the username and password from the request body
    //save the username and an irreversibly encrypted password 

    //encrypt 
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword  = bcrypt.hashSync(password, salt)
    
    //save the user and password to db
    try{
        const insertUser = db.prepare(`INSERT INTO user(username, password) VALUES(?, ?)`) //prepares and avoids sql injection
        const result = insertUser.run(username, hashedPassword) //communicates with the db and returns the result

        //now that we have a user, I want to add their first todo for them
    }

    catch(err){
        console.log(err.mesage)
        res.status(503)
    }

    res.status(200).json({serverMessage: 'Register endpoint called'})
})

//Login an existing user endpoint /auth/login
router.post('/login', (req, res) => {
    console.log('Login endpoint called')
    res.status(200).json({serverMessage: 'Login endpoint called'})
})



export default router //Exports the router object


