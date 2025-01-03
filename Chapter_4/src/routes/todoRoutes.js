import express from "express";
import prisma from "../prismaClient.js"


const router = express.Router();

//READ all todos for logged-in user
router.get('/', async(req, res) => {
  const todos = await prisma.todo.findMany({
    where:{
      userId: req.userId
    }
  })
  res.status(200).json(todos)
})

//CREATE a new todo
router.post("/", async (req, res) => {
  const {task} = req.body
  const todo = await prisma.todo.create({
    data:{
      userId: req.userId,
      task: task
    }
  })
  res.status(200).json({todoId: result.lastInsertRowid, task: task, completed: 0})
});

//UPDATE a new todo
router.put("/:id", async (req, res) => { //never forget to make the handlers async since it connects to the db
  const {completed} = req.body
  const {id} = req.params

  const updatedTodo = await prisma.todo.update({
    where:{
      id: parseInt(id),
      userId: req.userId
    },
    data: {completed: !!completed}
  })
  res.status(200).json(updatedTodo)
});

//DELETE a new todo
router.delete("/:id", async (req, res) => {
  const {id} = req.params
  
  await prisma.todo.delete({
    where:{
      id: parseInt(id),
      userId: req.userId
    }
  })
  res.status(200).json({message: "Todo DELETED"})
});

export default router;
