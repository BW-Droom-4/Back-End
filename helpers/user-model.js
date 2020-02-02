const db = require('../data/dbConfig.js');

module.exports = {
    getUser,
    findBy,
    getUserById,
    getUserProfile,
    insertUser,
    updateUser,
    removeUser,

    getUserExperience,
    getUserExperienceById,
    insertUserExperience,
    updateUserExperience,
    removeUserExperience,

    getUserInterest,
    getUserInterestById,
    insertUserInterest,
    updateUserInterest,
    removeUserInterest,

};
  
function getUser() {
    return db('users');
}

function findBy(filter) {
    return db('users').where(filter);
}

function getUserById(id) {
    const user = (
         db('users')
        .select('*')
        .where('id', id)
    )[0]
    userDetail = {
        ...user,
        images: db('userimages')
        .select('id', 'user_image')
        .where('user_id', id)
    }
    return userDetail
}
// const getUserById = async id => {
//     const user = (
//         await db('users')
//         .select('*')
//         .where('id', id)
//     )[0]
//     userDetail = {
//         ...user,
//         images: await db('userimages')
//         .select('id', 'user_image')
//         .where('user_id', id)
//     }
//     return userDetail
// }

  
function getUserProfile(id) {
    const profile = (
        db('users as u')
        .join('userprofiles as up', 'up.user_id', 'u.id')
        .select('u.id', 'up.occupation_title', 'up.about_user', 'up.years_of_experience')
        .where('u.id', id)
    )[0]
    profileDetail = {
        ...profile,
        interests: db('userinterests')
        .select('id', 'interest_area')
        .where('user_id', id),
        experiences: db('userexperiences')
        .select('id', 'company_worked_for', 'employment_startdate', 'employment_enddate', 'experience_detail')
        .where('user_id', id)
    }
    return profileDetail
}

  
function insertUser(user) {
    return db('users')
    .insert(user)
    .then(ids => {
        return getById(ids[0]);
    });
}
  
function updateUser(id, changes) {
    return db('users')
    .where({ id })
    .update(changes);
}
  
function removeUser(id) {
    return db('users')
    .where('id', id)
    .del();
}

//userexperience starts below

function getUserExperience() {
    return db('userexperiences');
}

function getUserExperienceById(id) {
    return db('userexperiences')
    .where('id', id)
}

function insertUserExperience(userexperience) {
    return db('userexperiences')
      .insert(userexperience)
      .then(ids => {
        return getById(ids[0]);
      });
}

function updateUserExperience(id, userexperience) {
    return db('userexperiences')
    .where('id', id)
    .update(userexperience)
}

    
function removeUserExperience(id) {
    return db('userexperiences')
      .where('id', id)
      .del();
}

//userinterest starts below
  
function getUserInterest() {
    return db('userinterests');
}

function getUserInterestById(id) {
    return db('userinterests')
    .where('id', id)
}[0]

function insertUserInterest(userinterest) {
    return db('userinterests')
    .insert(userinterest)
    .then(ids => {
        return getById(ids[0]);
    });
}

function updateUserInterest(id, userinterest) {
    return db('userinterests')
    .where('id', id)
    .update(userinterest)
}[0]
  
function removeUserInterest(id) {
    return db('userinterests')
    .where('id', id)
    .del();
}