const router = require('express').Router();
const Users = require('../helpers/user-model');
const Images = require('../helpers/image-model');
const Profiles = require('../helpers/profile-model');
const Matches = require('../helpers/match-model');
const authenticate = require('../auth/authenticate-middleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb (null, './uploads/')
    },
    filename: function (req, file, cb) {
        console.log(req.body)
        const test = new Date().toISOString() + file.originalname
        cb (null, test)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }   
}

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.post('/:id/upload', upload.single('user_image'), (req, res) => {
    console.log(req.file)

    const imageData = req.file
    console.log(imageData)
    const user_id = req.params.id
    // console.log(id)
    // const { user_id } = id
    const user_image = req.file.path
    console.log(user_image)
    console.log(req.body)
    if (!user_id || !user_image) {
        res.status(400).json({errorMessage: "Please provide user id to upload image."})
    } 
    else if (user_id && user_image) {
        Users.getUserById(user_id)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to add image because no user with such id found'})
            } 
            else {
                Images.insertUserImage({user_id, user_image})
                .then( image => {
                    res.status(201).json(image)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to add image. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to add image.'})
        })
    
    }
})

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
    console.log(experienceData)
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

//profile model

router.post('/:id/profile', authenticate, (req, res)=>{
    const profilesData = req.body
    const id = req.params.id
    const { user_id, occupation_title, about_user, years_of_experience } = profilesData;

    if (!user_id || !occupation_title || !about_user || ! years_of_experience) {
        res.status(400).json({errorMessage: "Please provide all contents for the profile of user."})
    } 
    else if (user_id && occupation_title && about_user && years_of_experience) {
        Users.getUserById(id)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to add profile because no user with such id found'})
            } 
            else {
                Profiles.insertUserProfile(profilesData)
                .then( pro => {
                    res.status(201).json(pro)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to add profile. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to add profile.'})
        })
    
    }
})

router.put('/:user_id/profile/:id', authenticate, (req, res)=>{
    const profilesData = req.body
    const id = req.params.id

    const { user_id, occupation_title, about_user, years_of_experience } = profilesData;

    if (!user_id || !occupation_title || !about_user || ! years_of_experience) {
        res.status(400).json({errorMessage: "Please provide all contents for the profile of user."})
    } 
    else if (user_id && occupation_title && about_user && years_of_experience) {
        Users.getUserById(user_id)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to update profile because no user with such id found'})
            } 
            else if (user) {
                Profiles.getUserProfileById(id)
                .then (pro => {
                    if (!pro) {
                        res.status(404).json({error: 'Failed to update profile because no such interest id found'})
                    }
                    else {
                        Profiles.updateUserProfile(profilesData)
                        .then( pro => {
                            res.status(201).json(pro)
                        })
                        .catch( err => {
                            res.status(500).json({error: 'Failed to update profile. Try again later'})
                        })
                    }
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to update profile.'})
        })
    
    }
})

router.delete('/:user_id/profile/:id', authenticate, (req, res)=>{
    const profilesData = req.body
    const id = req.params.id

    const { user_id, occupation_title, about_user, years_of_experience } = profilesData;

    Users.getUserById(user_id)
    .then(user => {
        if(!user){
            res.status(404).json({error: 'Failed to delete profile because no user with such id found'})
        } 
        else if (user) {
            Profiles.getUserProfileById(id)
            .then (pro => {
                if (!pro) {
                    res.status(404).json({error: 'Failed to delete profile because no such interest id found'})
                }
                else {
                    Profiles.removeUserProfile(profilesData)
                    .then( pro => {
                        res.status(201).json(pro)
                    })
                    .catch( err => {
                        res.status(500).json({error: 'Failed to delete profile. Try again later'})
                    })
                }
            })
        }
    })
    .catch( err => {
        res.status(500).json({error: 'Failed to get user to delete profile.'})
    })
})


// match
router.post('/:id/match', (req, res) => {
    console.log(req.body)
    // const test = json.parse(req.body)
    const matchData = req.body
    // console.log(test)
    const { user_id, company_id, user_liked} = matchData
    console.log(matchData)

    if (!user_id || !company_id || !user_liked) {
        res.status(400).json({errorMessage: `Please provide user id to add user likes.${company_id}`})
    } 
    else if (user_id && company_id && user_liked) {
        Users.getUserById(user_id)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to add user likes because no user with such id found'})
            } 
            else {
                Matches.insertUserLikes(matchData)
                .then( image => {
                    res.status(201).json(image)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to add user likes. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to add user likes.'})
        })
    
    }
})

router.get('/:id/match', (req, res) => {
    console.log(req.body)

    const id = req.params.id
    // const test = json.parse(req.body)
        Users.getUserById(id)
        .then(user => {
            if(!user){
                res.status(404).json({error: 'Failed to get user likes because no user with such id found'})
            } 
            else {
                Matches.getUserLikesById(id)
                .then( match => {
                    res.status(201).json(match)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to get user likes. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get user to get user likes.'})
        })
    
    
})

module.exports = router;
