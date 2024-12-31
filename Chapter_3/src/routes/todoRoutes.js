import express from 'express'
//import db from '../db.js'

const router = express.Router()



//CREATE a new todo
router.post('/', (req, res) => {
    console.log('POST a new todo')
    res.status(200).json({serverMessage: "POST all todos from server"})
})

//READ all todos for logged-in user
router.get('/', (req, res) => {
    console.log('GET all todos')
    res.status(200).json({serverMessage: "GET all todos from server"})
})

//READ individual todos for logged-in user
router.get('/:id', (req, res) => {
    console.log('GET individual todo')
    res.status(200).json({serverMessage: "GET individual todo from server"})
})

//UPDATE a new todo 
router.put('/:id', (req, res) => {
    console.log('PUT a new todo')
    res.status(200).json({serverMessage: "PUT individual todo from server"})
})

//DELETE a new todo
router.delete('/:id', (req, res) => {
    console.log('DELETE a new todo')
    res.status(200).json({serverMessage: "DELETE individual todo from server"})
})

export default router 