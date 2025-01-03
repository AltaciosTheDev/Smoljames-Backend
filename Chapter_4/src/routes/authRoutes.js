import express from "express";
import bcrypt from "bcryptjs"; //Import the bcryptjs package
import jwt from "jsonwebtoken"; //Import the jsonwebtoken package
import prisma from "../prismaClient.js"

const router = express.Router(); //Creates a new router object

//Register a new user endpoint /auth/register
router.post("/register", async (req, res) => {
  console.log("Register endpoint called");
  const { username, password } = req.body; //Destructure the username and password from the request body
  //save the username and an irreversibly encrypted password

  //encrypt
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  //save the user and password to db
  try {
    const user = await prisma({
      data: {
        username,
        password: hashedPassword
      }
    })

    //now that we have a user, I want to add their first todo for them
    const defaultTodo = "Hello :) Add your first todo!";
    await prisma.todo.create({
      data:{
        task: defaultTodo,
        userId: user.id
      }
    })

    //create a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({token})
  } catch (err) {
    console.log(err.message);
    res.status(503);
  }
});

//Login an existing user endpoint /auth/login
router.post("/login", async (req, res) => {
  console.log("Login endpoint called");
  //1)Get email and password
  const {username,password} = req.body
  
  try{
    //2)get user associated to email 
    const user = await prisma.user.findUnique({
      where:{
        username: username
      }
    })
    // 2.a) - if user not found -> exit / return from function
    if(!user){
        return res.status(404).send({message:"User not found!"})
    }
    //2.b) - if user found -> compare string to hased user password from db
    console.log(user)
    const passwordIsValid = bcrypt.compareSync(password, user.password)
    
    //3) compare password

    //3.a - invalid password -> exit / return from function
    if(!passwordIsValid){ //wrong password input(!verb)
        return res.status(401).send({message: "Invalid password!"})
    }
    //3.b - valid password(succesful auth)

    //4)create token
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    res.json({token})

  }
  catch(err){//for example db is not able to be located
    console.log(err.message)
    res.status(503)//back end error
  }

});

export default router; //Exports the router object
