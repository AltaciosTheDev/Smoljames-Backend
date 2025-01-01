import jwt from "jsonwebtoken"

const authMiddleware = (req,res, next) => {
    const token = req.headers.authorization
    console.log('this should log the token: ',token)

    //no token 
    if(!token){
        return res.status(401).json({message: "No token provided"})
    }

    //verify token
    jwt.verify(token, process.env.JWT_SECRET,(err, decoded) => {
        if(err){
            return res.status(401).json({message: "Invalid token"})
        }
        req.userId = decoded.id
        console.log('Auth middleware finished')
        next() //when middleware finished, head to the endpoint
    })
}

export default authMiddleware