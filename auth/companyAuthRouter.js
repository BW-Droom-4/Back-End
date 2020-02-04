const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Companies = require('../helpers/company-model');
const {jwtSecret} = require('../config/tokens');


router.post('/register', async (req, res) => {
  // implement registration

  //step 1 - validate company before creating
  const company = req.body
  const { companyName, email, password } = company

  try {
    // step 2 - check if company already exists
        // const companyExist = await Companies.findBy({ email }).first();
        // if (companyExist)
        // return res.status(400).json({ message: `Company, with this email: ${email}, is already registered.` });

    // step 3 - create new company and hash password
        const hash = await bcrypt.hashSync(company.password, 10);
        company.password = hash

        const newCompany = await Companies.insertCompany(company)
        res.status(201).json(newCompany)
    }

  catch (error) {
        res.status(500).json({message: error.message})
    }

});

router.post('/login', async(req, res) => {
  // implement login
  
  //step 1 - validate company before logging in

  const { companyName, email, password } = req.body;

  try {
    // step 2 - check if company exists in our database

    // const companyExists = await Companies.findBy({ email }).first();
    // if (!companyExists) 
    //     return res.status(400).json({ message: "Company with this email does not exist in our database." });

    const company = await Companies.findBy({email}).first()
        if (company && bcrypt.compareSync(password, company.password)) {
            const token = signToken(company)
            res.status(200).json({token})
        } 
        else {
            res.status(401).json({message: 'Invalid credentials. Password did not match our records.'})
        }
    }
  catch (error) {
        res.status(500).json({message: error.message})
    }
})

function signToken(company) {
  const payload = {
      companyId: company.id,
      email: company.email
  }

  const options = {
      expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
