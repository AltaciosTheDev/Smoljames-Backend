import express from "express";
import db from '../db.js'
import { get } from "http";

const router = express.Router();

//READ all todos for logged-in user
router.get('/all', (req, res) => {
  console.log(`called the all endpoint`)
  const getAllTodos = db.prepare(`SELECT * FROM todos`)
  const todos = getAllTodos.all()
  console.log(todos)
  res.status(200).json(todos)
})

router.get("/", (req, res) => {
  const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id=?`) //filter and get only todos where user_id matches the id in the token payload
  //req.userId b/c middleware will handle and include the userId in the request if successful
  const todos = getTodos.all(req.userId) //all returns all records, get returns only 1!  
  console.log(todos)
  res.status(200).json(todos)
});

//CREATE a new todo
router.post("/", (req, res) => {
  console.log("POST todo endpoint called");
  const {task} = req.body

    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES(?,?)`)
    const result = insertTodo.run(req.userId, task)
    res.status(200).json({todoId: result.lastInsertRowid, task: task, completed: 0})
});

//READ individual todos for logged-in user
router.get("/:id", (req, res) => {

});

//UPDATE a new todo
router.put("/:id", (req, res) => {
  console.log("PUT  todo endpoint called");
  const {completed} = req.body
  const {id} = req.params

  const updatedTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`)
  updatedTodo.run(completed, id)
  res.status(200).json({message: "Todo completed"})
});

//DELETE a new todo
router.delete("/:id", (req, res) => {
  console.log("DELETE todo endpoint called");
  const {id} = req.params

  const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
  deleteTodo.run(id, req.userId)
  res.status(200).json({message: "Todo DELETED"})
});

export default router;
