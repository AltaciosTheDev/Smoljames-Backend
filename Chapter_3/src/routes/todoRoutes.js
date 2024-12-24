import express from 'express'
import db from '../db.js'

const router = express.Router()

//Get all todos for logged-in user
router.get('/', (req, res) => {
    console.log('GET all todos')
    res.status(200).json({serverMessage: "GET all todos from server"})
})

router.post('/', (req, res) => {
    console.log('POST a new todo')
    res.status(200).json({serverMessage: "POST all todos from server"})
})

router.put('/', (req, res) => {
    console.log('PUT a new todo')
    res.status(200).json({serverMessage: "PUT all todos from server"})
})

router.delete('/', (req, res) => {
    console.log('DELETE a new todo')
    res.status(200).json({serverMessage: "DELETE all todos from server"})
})
export default router 