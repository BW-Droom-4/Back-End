const router = require('express').Router();
const Users = require('../helpers/user-model');
const authenticate = require('../auth/authenticate-middleware');

router.get('/', (req, res)=>{
    Users.getUser()
        .then(usersList=>{
            res.status(200).json(usersList)
        })
        .catch(()=>{
            res.status(500).json({message: 'failed to get users'})
        })
})

router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id

    Users.getUserById(id)
    .then (user => {
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({message: "The user with the provided ID does not exist."})
        }
    })
    .catch (err => {
        res.status(500).json({error: "The user information could not be retrieved."})
    })
})

router.get('/:id/profile', authenticate, (req, res) => {
    const id = req.params.id

    Users.getUserById(id)
    .then (user => {
        if(!user){
            res.status(404).json({error: 'Failed to get profile because no user with such id found'})
        } 
        else {
            Users.getUserProfile(id)
            .then (userprofile => {
                if (userprofile) {
                    res.status(200).json(userprofile)
                }
                else {
                    res.status(404).json({message: "Failed to get user profile. Try again later."})
                }
            })
        }
    })
    .catch (err => {
        res.status(500).json({error: "The user profile information could not be retrieved because user not found."})
    })
})

router.put('/:id', authenticate, (req, res) => {
    const id = req.params.id
    const userData = req.body
    const { firstname, lastname, email, password } = userData

    if (!firstname || !lastname || !email || !password) {
        res.status(400).json({errorMessage: "Please provide all contents for the user."})
    }
    else if (firstname && lastname && email && password) {
        Users.updateUser(id, userData)
        .then (user => {
            if (user) {
                res.status(200).json(user)
            }
            else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch (err => {
            res.status(500).json({error: "The user information could not be modified."})
        })
    }
})

router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id

    Users.removeUser(id)
    .then (user => {
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch (err => {
        res.status(500).json({error: "The user could not be removed"})
    })

})

router.post('/:id/experience', authenticate, (req, res)=>{
    const experienceData = req.body
    const id = req.params.id
    const { user_id, company_worked_for, employment_startdate, employment_enddate, experience_detail } = experienceData;

    if (!user_id || !company_worked_for || !employment_startdate || !employment_enddate || !experience_detail) {
        res.status(400).json({errorMessage: "Please provide all contents for the experience."})
    } 
    else if (user_id && company_worked_for && employment_startdate && employment_enddate && experience_detail) {
        Users.getUserById(id)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to add experience because no user with such id found'})
            } 
            else {
                Users.insertUserExperience(experienceData)
                .then( exp => {
                    res.status(201).json(exp)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to add experience. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to add experience.'})
        })
    
    }
})

router.put('/:user_id/experience/:id', authenticate, (req, res)=>{
    const experienceData = req.body
    const id = req.params.id

    const { user_id, company_worked_for, employment_startdate, employment_enddate, experience_detail } = experienceData;

    if (!user_id || !company_worked_for || !employment_startdate || !employment_enddate || !experience_detail) {
        res.status(400).json({errorMessage: "Please provide all contents for the experience."})
    } 
    else if (user_id && company_worked_for && employment_startdate && employment_enddate && experience_detail) {
        Users.getUserById(user_id)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to update experience because no user with such id found'})
            } 
            else if (user) {
                Users.getUserExperienceById(id)
                .then (experience => {
                    if (!experience) {
                        res.status(404).json({error: 'Failed to update experience because no such experience id found'})
                    }
                    else {
                        Users.updateUserExperience(experienceData)
                        .then( exp => {
                            res.status(201).json(exp)
                        })
                        .catch( err => {
                            res.status(500).json({error: 'Failed to update experience. Try again later'})
                        })
                    }
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to update experience.'})
        })
    
    }
})

router.delete('/:user_id/experience/:id', authenticate, (req, res)=>{
    const experienceData = req.body
    const id = req.params.id

    const { user_id, company_worked_for, employment_startdate, employment_enddate, experience_detail } = experienceData;

    Users.getUserById(user_id)
    .then(user => {
        if(!user){
            res.status(404).json({error: 'Failed to delete experience because no user with such id found'})
        } 
        else if (user) {
            Users.getUserExperienceById(id)
            .then (experience => {
                if (!experience) {
                    res.status(404).json({error: 'Failed to delete experience because no such experience id found'})
                }
                else {
                    Users.removeUserExperience(experienceData)
                    .then( exp => {
                        res.status(201).json(exp)
                    })
                    .catch( err => {
                        res.status(500).json({error: 'Failed to delete experience. Try again later'})
                    })
                }
            })
        }
    })
    .catch( err => {
        res.status(500).json({error: 'Failed to get user to delete experience.'})
    })
})

// userinterests
router.post('/:id/interest', authenticate, (req, res)=>{
    const interestData = req.body
    const id = req.params.id
    const { user_id, interest_area } = interestData;

    if (!user_id || !interest_area) {
        res.status(400).json({errorMessage: "Please provide all contents for the interest of user."})
    } 
    else if (user_id && interest_area) {
        Users.getUserById(id)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to add interest because no user with such id found'})
            } 
            else {
                Users.insertUserInterest(interestData)
                .then( interest => {
                    res.status(201).json(interest)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to add interest. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to add interest.'})
        })
    
    }
})

router.put('/:user_id/interest/:id', authenticate, (req, res)=>{
    const interestData = req.body
    const id = req.params.id

    const { user_id, interest_area } = interestData;

    if (!user_id || !interest_area) {
        res.status(400).json({errorMessage: "Please provide all contents for the interest of user."})
    } 
    else if (user_id && interest_area) {
        Users.getUserById(user_id)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to update interest because no user with such id found'})
            } 
            else if (user) {
                Users.getUserInterestById(id)
                .then (interest => {
                    if (!interest) {
                        res.status(404).json({error: 'Failed to update interest because no such interest id found'})
                    }
                    else {
                        Users.updateUserInterest(interestData)
                        .then( interest => {
                            res.status(201).json(interest)
                        })
                        .catch( err => {
                            res.status(500).json({error: 'Failed to update interest. Try again later'})
                        })
                    }
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to update interest.'})
        })
    
    }
})

router.delete('/:user_id/interest/:id', authenticate, (req, res)=>{
    const interestData = req.body
    const id = req.params.id

    const { user_id, interest_area} = interestData;

    Users.getUserById(user_id)
    .then(user => {
        if(!user){
            res.status(404).json({error: 'Failed to delete interest because no user with such id found'})
        } 
        else if (user) {
            Users.getUserInterestById(id)
            .then (interest => {
                if (!interest) {
                    res.status(404).json({error: 'Failed to delete interest because no such interest id found'})
                }
                else {
                    Users.removeUserInterest(interestData)
                    .then( interest => {
                        res.status(201).json(interest)
                    })
                    .catch( err => {
                        res.status(500).json({error: 'Failed to delete interest. Try again later'})
                    })
                }
            })
        }
    })
    .catch( err => {
        res.status(500).json({error: 'Failed to get user to delete interest.'})
    })
})


module.exports = router;
