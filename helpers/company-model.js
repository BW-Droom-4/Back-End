const db = require('../data/dbConfig.js');

module.exports = {
    getCompany,
    findBy,
    getCompanyById,
    getCompanyProfile,
    insertCompany,
    updateCompany,
    removeCompany,

    getJobListing,
    getJobListingById,
    insertJobListing,
    updateJobListing,
    removeJobListing,
};
  

function getCompany() {
    return db('companies');
}

function findBy(filter) {
    return db('companies').where(filter);
}

async function getCompanyById(id) {
    const company = await(
        db('companies')
        .select('*')
        .where('id', id)
    )
    companyDetail = {
        ...company,
        images: await db('companyimages')
        .select('id', 'company_image')
        .where('company_id', id)
    }
    return companyDetail
}

  
async function getCompanyProfile(id) {
    const profile = await (
        db('companies as c')
        .join('companyprofiles as cp', 'cp.company_id', 'c.id')
        .select('c.id', 'cp.sector', 'cp.about_company')
        .where('c.id', id)
    )
    profileDetail = {
        ...profile,
        joblistings: await db('joblistings')
        .select('id', 'job_title', 'expiry_date', 'job_detail', 'matching_skill')
        .where('company_id', id),
    }
    return profileDetail
}

  
function insertCompany(company) {
    return db('companies')
    .insert(company)
}
  
function updateCompany(id, changes) {
    return db('companies')
    .where({ id })
    .update(changes);
}
  
function removeCompany(id) {
    return db('companies')
    .where('id', id)
    .del();
}

//joblisting start below

function getJobListing() {
    return db('joblistings');
}

function getJobListingById(id) {
    return db('joblistings')
    .where('id', id)
}[0]

function insertJobListing(joblisting) {
    return db('joblistings')
      .insert(joblisting)
}

function updateJobListing(id, joblisting) {
    return db('joblistings')
    .where('id', id)
    .update(joblisting)
}[0]

    
function removeJobListing(id) {
    return db('joblistings')
      .where('id', id)
      .del();
}
