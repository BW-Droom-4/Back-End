const router = require('express').Router();
const Companies = require('../helpers/company-model');
const Profiles = require('../helpers/profile-model');
const Images = require('../helpers/image-model')
const authenticate = require('../auth/authenticate-middleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb (null, './uploadscompany/')
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

router.post('/:id/upload', upload.single('company_image'), (req, res) => {
    console.log(req.file)

    const imageData = req.file
    console.log(imageData)
    const company_id = req.params.id
    // console.log(id)
    // const { user_id } = id
    const company_image = req.file.path
    console.log(company_image)
    console.log(req.body)
    if (!company_id || !company_image) {
        res.status(400).json({errorMessage: "Please provide company id to upload image."})
    } 
    else if (company_id && company_image) {
        Companies.getCompanyById(company_id)
        .then(company => {
            if(!company){
                res.status(404).json({error: 'Failed to add image because no company with such id found'})
            } 
            else {
                Images.insertCompanyImage({company_id, company_image})
                .then( image => {
                    res.status(201).json(image)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to add image. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get company to add image.'})
        })
    
    }
})

router.get('/', authenticate, (req, res)=>{
    Companies.getCompany()
        .then(CompaniesList=>{
            res.status(200).json(CompaniesList)
        })
        .catch(()=>{
            res.status(500).json({message: 'failed to get Companies'})
        })
})

router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id

    Companies.getCompanyById(id)
    .then (company => {
        if (company) {
            res.status(200).json(company)
        }
        else {
            res.status(404).json({message: "The company with the provided ID does not exist."})
        }
    })
    .catch (err => {
        res.status(500).json({error: "The company information could not be retrieved."})
    })
})

router.get('/:id/profile', authenticate, (req, res) => {
    const id = req.params.id

    Companies.getCompanyById(id)
    .then(company => {
        if(!company){
            res.status(404).json({error: 'Failed to get profile because no company with such id found'})
        } 
        else {
            Companies.getCompanyProfile(id)
            .then (companyprofile => {
                if (companyprofile) {
                    res.status(200).json(companyprofile)
                }
                else {
                    res.status(404).json({message: "Failed to get company profile. Try again later."})
                }
            })
        }
    })
    .catch (err => {
        res.status(500).json({error: "The company profile information could not be retrieved."})
    })
})

router.put('/:id', authenticate, (req, res) => {
    const id = req.params.id
    const companyData = req.body
    const { companyName, email, password } = companyData

    if (!companyName || !email || !password) {
        res.status(400).json({errorMessage: "Please provide all contents for the company."})
    }
    else if (companyName && email && password) {
        Companies.updateCompany(id, companyData)
        .then (company => {
            if (company) {
                res.status(200).json(company)
            }
            else {
                res.status(404).json({message: "The company with the specified ID does not exist."})
            }
        })
        .catch (err => {
            res.status(500).json({error: "The company information could not be modified."})
        })
    }
})

router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id

    Companies.removeCompany(id)
    .then (company => {
        if (company) {
            res.status(200).json(company)
        }
        else {
            res.status(404).json({message: "The company with the specified ID does not exist."})
        }
    })
    .catch (err => {
        res.status(500).json({error: "The company could not be removed"})
    })

})

router.post('/:id/joblisting', authenticate, (req, res)=>{
    const joblistingData = req.body
    const id = req.params.id
    const { company_id, job_title, expiry_date, job_detail, matching_skill} = joblistingData;

    if (!company_id || !job_title || !expiry_date || !job_detail || !matching_skill) {
        res.status(400).json({errorMessage: "Please provide all contents for the job listing."})
    } 
    else if (company_id && job_title && expiry_date && job_detail && matching_skill) {
        Companies.getCompanyById(id)
        .then(company => {
            if(!company){
                res.status(404).json({error: 'Failed to add experience because no company with such id found'})
            } 
            else {
                Companies.insertJobListing(joblistingData)
                .then( joblist => {
                    res.status(201).json(joblist)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to add job list. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get company to add job list.'})
        })
    
    }
})

router.put('/:company_id/joblisting/:id', authenticate, (req, res)=>{
    const joblistingData = req.body
    const id = req.params.id

    const { company_id, job_title, expiry_date, job_detail, matching_skill} = joblistingData;

    if (!company_id || !job_title || !expiry_date || !job_detail || !matching_skill) {
        res.status(400).json({errorMessage: "Please provide all contents for the job listing."})
    } 
    else if (company_id && job_title && expiry_date && job_detail && matching_skill) {
        Companies.getCompanyById(company_id)
        .then(company => {
            if(!company){
                res.status(404).json({error: 'Failed to update experience because no company with such id found'})
            } 
            else if (company) {
                Companies.getJobListingById(id)
                .then (joblist => {
                    if (!joblist) {
                        res.status(404).json({error: 'Failed to update joblist because no such joblist id found'})
                    }
                    else {
                        Companies.updateJobListing(joblistingData)
                        .then( joblist => {
                            res.status(201).json(joblist)
                        })
                        .catch( err => {
                            res.status(500).json({error: 'Failed to update joblist. Try again later'})
                        })
                    }
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get company to update joblist.'})
        })
    
    }
})

router.delete('/:company_id/joblisting/:id', authenticate, (req, res)=>{
    const joblistingData = req.body
    const id = req.params.id

    const { company_id, job_title, expiry_date, job_detail, matching_skill} = joblistingData;

    Companies.getCompanyById(company_id)
    .then(company => {
        if(!company){
            res.status(404).json({error: 'Failed to delete experience because no company with such id found'})
        } 
        else if (company) {
            Companies.getJobListingById(id)
            .then (joblist => {
                if (!joblist) {
                    res.status(404).json({error: 'Failed to delete joblist because no such joblist id found'})
                }
                else {
                    Companies.removeJobListing(joblistingData)
                    .then( joblist => {
                        res.status(201).json(joblist)
                    })
                    .catch( err => {
                        res.status(500).json({error: 'Failed to delete joblist. Try again later'})
                    })
                }
            })
        }
    })
    .catch( err => {
        res.status(500).json({error: 'Failed to get user to delete joblist.'})
    })
})

//profile model

router.post('/:id/profile', authenticate, (req, res)=>{
    const profilesData = req.body
    const id = req.params.id
    const { company_id, sector, about_company } = profilesData;

    if (!company_id || !sector || !about_company) {
        res.status(400).json({errorMessage: "Please provide all contents for the profile of company."})
    } 
    else if (company_id && sector && about_company) {
        Companies.getCompanyById(id)
        .then(company => {
            if(!company){
                res.status(404).json({error: 'Failed to add profile because no company with such id found'})
            } 
            else {
                Profiles.insertCompanyProfile(profilesData)
                .then( pro => {
                    res.status(201).json(pro)
                })
                .catch( err => {
                    res.status(500).json({error: 'Failed to add profile. Try again later'})
                })
            }
        })
        .catch( err => {
            res.status(500).json({error: 'Failed to get company to add profile.'})
        })
    
    }
})

router.put('/:company_id/profile/:id', authenticate, (req, res)=>{
    const profilesData = req.body
    const id = req.params.id

    const { company_id, sector, about_company } = profilesData;

    if (!company_id || !sector || !about_company) {
        res.status(400).json({errorMessage: "Please provide all contents for the profile of company."})
    } 
    else if (company_id && sector && about_company) {
        Companies.getCompanyById(company_id)
        .then(company => {
            if(!company){
                res.status(404).json({error: 'Failed to update profile because no company with such id found'})
            } 
            else if (company) {
                Profiles.getCompanyProfileById(id)
                .then (pro => {
                    if (!pro) {
                        res.status(404).json({error: 'Failed to update profile because no such interest id found'})
                    }
                    else {
                        Profiles.updatecompanyProfile(profilesData)
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
            res.status(500).json({error: 'Failed to get company to update profile.'})
        })
    
    }
})

router.delete('/:company_id/profile/:id', authenticate, (req, res)=>{
    const profilesData = req.body
    const id = req.params.id

    const { company_id, sector, about_user, years_of_experience } = profilesData;

    Companies.getCompanyById(company_id)
    .then(company => {
        if(!company){
            res.status(404).json({error: 'Failed to delete profile because no company with such id found'})
        } 
        else if (company) {
            Profiles.getCompanyProfileById(id)
            .then (pro => {
                if (!pro) {
                    res.status(404).json({error: 'Failed to delete profile because no such interest id found'})
                }
                else {
                    Profiles.removeCompanyProfile(profilesData)
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
        res.status(500).json({error: 'Failed to get company to delete profile.'})
    })
})

module.exports = router;
