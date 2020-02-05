const db = require('../data/dbConfig.js');

module.exports = {
    getUserProfile,
    getUserProfileById,
    insertUserProfile,
    updateUserProfile,
    removeUserProfile,

    getCompanyProfile,
    getCompanyProfileById,
    insertCompanyProfile,
    updateCompanyProfile,
    removeCompanyProfile,

}; 

// userProfiles starts here 

function getUserProfile() {
    return db('userprofiles');
}

function getUserProfileById(id) {
    return db('userprofiles')
    .where('id', id)
}

function insertUserProfile(userprofile) {
    return db('userprofiles')
      .insert(userprofile)
}

function updateUserProfile(id, userprofile) {
    return db('userprofiles')
    .where('id', id)
    .update(userprofile)
}[0]

    
function removeUserProfile(id) {
    return db('userprofiles')
      .where('id', id)
      .del();
}

//companyProfiles starts below
  
function getCompanyProfile() {
    return db('companyprofiles');
}

function getCompanyProfileById(id) {
    return db('companyprofiles')
    .where('id', id)
}

function insertCompanyProfile(companyprofile) {
    return db('companyprofiles')
    .insert(companyprofile)
}

function updateCompanyProfile(id, companyprofile) {
    return db('companyprofiles')
    .where('id', id)
    .update(companyprofile)
}
  
function removeCompanyProfile(id) {
    return db('companyprofiles')
    .where('id', id)
    .del();
}