import jwt from 'jsonwebtoken'

const requireAuth = (req,res,next)=>{
    const token = req.cookies.token

    //check json web token exists and is verified
    if(token){
        jwt.verify(token,'this is a secret',(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login')
            }else{
                console.log(decodedToken);
                next()
            }
        })
    }else{
        res.redirect('/login')
    }
}

export default requireAuth