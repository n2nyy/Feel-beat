const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
            if(err){
                res.status(401).json(err);
            }else if(decodedToken){
                req.user = decodedToken
                next();
            }else{
                res.status(401).json({error: "Authentication Failure"});
            }
        })
    }else{
        console.log({...req})
        res.status(401).json({error: "Authentication Failure"});
    }
}

module.exports = {
    requireAuth,
}