const jwt = require('jsonwebtoken');
const Register = require("../models/register");





const auth = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        const verifyUser =   jwt.verify(token,process.env.SECRAT_KEY);
        // console.log("this is token"+token)

        // console.log("this is a verifyUser value"+verifyUser);

        const user = await Register.findOne({_id:verifyUser._id});
        // console.log(user.firstname)

        // grap the token from user login after
        req.token = token;
        req.user = user;

        next();

    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = auth;