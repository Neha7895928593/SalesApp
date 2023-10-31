


const jwt = require('jsonwebtoken');
const SECRET_KEY = require('./config');

async function checkLogin(req, res, next) {
  try {
    const token = req.header('Authorization');

    if (!token) {
      res.status(401).json({
        message: 'Not Logged In'
      });
    } else {
      
      const tokenWithoutBearer = token.replace('Bearer ', '');

      const userData = jwt.verify(tokenWithoutBearer, SECRET_KEY.SECRET_KEY);

      if (!userData) {
        res.status(401).json({
          message: 'Looks like there was an error while verifying the token'
        });
      } else {
        next();
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'There was an error while interacting with the database'
    });
  }
}

module.exports = checkLogin;
// const jwt = require('jsonwebtoken');
// const  SECRET_KEY  = require('./config');

// async function checkLogin(req,res,next){
//     try {
//         const {token} = req.body;
//         if(!token){
//             res.status(401).json({
//                 message:"Not Loggedin"
//             })
//         }
//         else{
//             const userData = jwt.verify(token,SECRET_KEY.SECRET_KEY);
//             if(!userData){
//                 res.status(401).json({
//                     message:"Look like there was error while verifying token"
//                 })
//             }
//             else{
//                 next();
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message:"There was an error while interacting with db"
//         })
//     }
// }

// module.exports = checkLogin;
