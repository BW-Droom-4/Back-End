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
}[0]

function insertUserImage(userimage) {
    return db('userimages')
      .insert(userimage)
      .then(ids => {
        return getById(ids[0]);
      });
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

function insertCompanyImage(companyimage) {
    return db('companyimages')
    .insert(companyimage)
    .then(ids => {
        return getById(ids[0]);
    });
}
  
function removeCompanyImage(id) {
    return db('companyimages')
    .where('id', id)
    .del();
}