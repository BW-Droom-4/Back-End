const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../helpers/user-model');
const {jwtSecret} = require('../config/tokens');
const { registerUserValidation, loginUserValidation } = require('./validation/userValidation.js');


router.post('/register', async (req, res) => {
  // implement registration

  //step 1 - validate user before creating
  const { error } = registerUserValidation(req.body);
  if (error) {
    const { details } = error;
    const message = details.map(detail => detail.message).join(',');
    res.status(422).json({ error: message });
  }

  const user = req.body
  const { firstname, lastname, email, password } = user

  try {
    // step 2 - check if user already exists
        const userExist = await Users.findBy({ email }).first();
        if (userExist)
        return res.status(400).json({ message: 'User, with this email, is already registered.' });

    // step 3 - create new user and hash password
        const hash = await bcrypt.hashSync(user.password, 10);
        user.password = hash

        const newUser = await Users.insertUser(user)
        res.status(201).json(newUser)
    }

  catch (error) {
        res.status(500).json({message: error.message})
    }

});

router.post('/login', async(req, res) => {
  // implement login
  
  //step 1 - validate user before logging in
  const { error } = loginUserValidation(req.body);
  if (error) {
    const { details } = error;
    const message = details.map(detail => detail.message).join(',');
    res.status(422).json({ error: message });
  }


  const { firstname, email, password } = req.body;

  try {
    // step 2 - check if user exists in our database

    const userExists = await Users.findBy({ email }).first();
    if (!userExists) 
        return res.status(400).json({ message: "Email doesn't exist in our database." });

    const user = await Users.getUser({email}).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = signToken(user)
            res.status(200).json({message: `Hi ${firstname}, Welcome to Droom!. Your token is ${token}`})
        } 
        else {
            res.status(401).json({message: 'Invalid credentials. Password did not match our records.'})
        }
    }
  catch (error) {
        res.status(500).json({message: error.message})
    }
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
