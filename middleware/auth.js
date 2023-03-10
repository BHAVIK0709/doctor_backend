// const jwt = require('jsonwebtoken');

// module.exports = async(req,res, next )=>{
//   try {
//     const token = req.headers['authorization'].split('')[1]
//     jwt.verify(token,process.env.JWT_SECRET,(error,decode)=>{
// if(error){
//     return res.status(200).send({
//         Message:'Auth Failed',
//         success:false
//     })
//     }else{
//     req.body.userId :decode._id
//     next()
//     }
//   })
    
//   } catch (error) {
//     console.log(error)
//     res.status(401).send({
//         message:"Auth Failed",
//         success:false,
//     })
    
//   }
// }


const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const authenticateJWT = async(req, res, next) => {
 console.log(req.headers)
    const { authorization } = req.headers   
 
    if (!authorization) {
        return res.status(401).json({ error: 'Token is reuired'});
    }

    const token = authorization.split(' ')[1]
    console.log(token)

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({_id}).select('_id');
        next();

    } catch (error) {
        res.status(401).send({error: 'Token is expired!'});
    };
};

module.exports = authenticateJWT;
