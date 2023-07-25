import jwt from "jsonwebtoken"

const requireAuth = async (req,res,next)=>{
    const authHeader = req.headers['authorization'] 
    console.log(authHeader,"requestttttttttttt")
    let token = authHeader.split(" ")[1]

    if(authHeader  && authHeader.startsWith('Bearer'))
    {
         console.log(token , "Token displayed")
         try{
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            console.log(decoded,"decodedddddddd");
            req.body.userId = decoded.id
            next()
        }catch(err){
            console.log(err)
            console.log("Reached error")
            res.status(403).json(err )
        }
    }
    if(!token){
        console.log("No token recieved")
        res.status(HttpStatus.UNAUTHORIZED).json({ err : "User is Unauthorized , No token recieved"} )
    }
}

export default requireAuth