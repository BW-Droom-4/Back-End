const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../helpers/user-model');
const {jwtSecret} = require('../config/tokens');


router.post('/register', (req, res) => {
  // implement registration

  //step 1 - validate user before creating
  let user = req.body

// step 2 - check if user already exists
    // const userExist = Users.findBy(user.email).first();
    // if (userExist)
    // return res.status(400).json({ message: 'User, with this email, is already registered.' });

// step 3 - create new user and hash password
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash

    Users.insertUser(user)
    .then(newUser => {
        console.log(newUser)
        res.status(201).json(newUser)
    })
    .catch(() =>{
        res.status(500).json({message: 'failed to add new user'})
    })
  
});

router.post('/login', (req, res) => {
  // implement login
  
  //step 1 - validate user before logging in
  let { firstname, email, password } = req.body;

 // step 2 - check if user exists in our database
    const userExists =  Users.findBy({email}).first();
    if (!userExists) 
        return res.status(400).json({ message: "Email doesn't exist in our database." });

    Users.findBy({email}).first()
    .then( user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = signToken(user)
            res.status(200).json({token})
        } 
        else {
            res.status(401).json({message: 'Invalid credentials. Password did not match our records.'})
        }
    })
    .catch (() => {
        res.status(500).json({message: "Failed to login."})
    })
})

function signToken(user) {
  const payload = {
      userId: user.id,
      email: user.email
  }

  const options = {
      expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
