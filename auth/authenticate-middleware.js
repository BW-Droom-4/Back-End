const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config/tokens')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken)=>{
          if (err) {
              //the token is not valid
              res.status(401).json({message: 'Invalid token!'})
          } else {
              next();
          }
      })
  } 
  else {
    res.status(401).json({ message: 'No access for you!' });
  }
};