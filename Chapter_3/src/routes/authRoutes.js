import express from 'express'
import bcrypt from 'bcryptjs' //Import the bcryptjs package
import jwt from 'jsonwebtoken' //Import the jsonwebtoken package
import db from '../db.js' //Import the database connection

const router = express.Router() //Creates a new router object

router.post('/register', (req, res) => {
    console.log('Register endpoint called')
    res.status(200).json({serverMessage: 'Register endpoint called'})
})

router.post('/login', (req, res) => {
    console.log('Login endpoint called')
    res.status(200).json({serverMessage: 'Login endpoint called'})
})



export default router //Exports the router object


