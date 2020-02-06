const db = require('../data/dbConfig.js');

module.exports = {
    getUserLikes,
    getUserLikesById,
    insertUserLikes,
    getCompanyLikes,
    getCompanyLikesById,
    insertCompanyLikes,
    getUserCompanyLikes,

}; 

// userlikes starts here 

function getUserLikes() {
    return db('userlikedcompany');
}

function getUserLikesById(id) {
    return db('userlikedcompany')
    .where('id', id)
}

function insertUserLikes(matchData) {
    console.log(matchData)
    return db('userlikedcompany')
      .insert(matchData)
}
    
// company likes 

function getCompanyLikes() {
    return db('companylikeduser');
}

function getCompanyLikesById(id) {
    return db('companylikeduser')
    .where('id', id)
}

function insertCompanyLikes(matchData) {
    console.log(matchData)
    return db('companylikeduser')
      .insert(matchData) 
}

function getUserCompanyLikes() {
    return db('users as u')
    .join('companylikeduser as cu', 'cu.user_id', 'u.id')
    .join('userlikedcompany as uc', 'uc.user_id', 'u.id')
    .select('uc.user_id', 'uc.company_id', 'uc.user_liked', 'cu.company_liked')
    .where({'uc.user_liked': 'true', 'uc.user_liked': 1})
    .andWhere({'cu.company_liked': 'true', 'cu.company_liked': '1'})
}


