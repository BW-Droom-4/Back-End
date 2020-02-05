const db = require('../data/dbConfig.js');

module.exports = {
    getUserImage,
    getUserImageById,
    insertUserImage,
    removeUserImage,

    getCompanyImage,
    getCompanyImageById,
    insertCompanyImage,
    removeCompanyImage,

}; 

// userimages starts here 

function getUserImage() {
    return db('userimages');
}

function getUserImageById(id) {
    return db('userimages')
    .where('id', id)
}

function insertUserImage(user_id, user_image) {
    return db('userimages')
      .insert(user_id, user_image)
  }
    
  function removeUserImage(id) {
    return db('userimages')
      .where('id', id)
      .del();
  }

//companyimages starts below
  
function getCompanyImage() {
    return db('companyimages');
}

function getCompanyImageById(id) {
    return db('companyimages')
    .where('id', id)
}[0]

function insertCompanyImage(company_id, company_image) {
    return db('companyimages')
    .insert(company_id, company_image)
}
  
function removeCompanyImage(id) {
    return db('companyimages')
    .where('id', id)
    .del();
}