
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
  .then( () => knex('userimages').truncate())
  .then( () => knex('userprofiles').truncate())
  .then( () => knex('userexperiences').truncate())
  .then( () => knex('userinterests').truncate())
  .then( () => knex('companies').truncate())
  .then( () => knex('companyimages').truncate())
  .then( () => knex('companyprofiles').truncate())
  .then( () => knex('joblistings').truncate())

  .then( () => {
      // Inserts seed entries
    return knex('users').insert([
      {id: 1, firstname: '', lastname: ' ', email: ''},
      {id: 2, firstname: '', lastname: ' ', email: ''},
      {id: 3, firstname: '', lastname: ' ', email: ''},
    ]);
  })

  .then(() => {
    return knex('userimages').insert([
      {id: 1, user_id: '', user_image: ''},
      {id: 2, user_id: '', user_image: ''},
      {id: 3, user_id: '', user_image: ''},
    ]);
  })

  .then(() => {
    return knex('userprofiles').insert([
      {id: 1, user_id: '', occupation_title: '', about_user: '', years_of_experience: ''},
      {id: 2, user_id: '', occupation_title: '', about_user: '', years_of_experience: ''},
      {id: 3, user_id: '', occupation_title: '', about_user: '', years_of_experience: ''},
    ]);
  })

  .then(() => {
    return knex('userexperiences').insert([
      {id: 1, user_id: '', company_worked_for: '', employment_startdate: '', employment_enddate: '', experience_detail: ''},
      {id: 2, user_id: '', company_worked_for: '', employment_startdate: '', employment_enddate: '', experience_detail: ''},
      {id: 3, user_id: '', company_worked_for: '', employment_startdate: '', employment_enddate: '', experience_detail: ''},
    ]);
  })
  .then(() => {
    return knex('userinterests').insert([
      {id: 1, user_id: '', interest_area: ''},
      {id: 2, user_id: '', interest_area: ''},
      {id: 3, user_id: '', interest_area: ''},
    ]);
  })
  .then(() => {
    return knex('companies').insert([
      {id: 1, company_name: '', email: '', password: ''},
      {id: 1, company_name: '', email: '', password: ''},
      {id: 1, company_name: '', email: '', password: ''},
    ]);
  })
  .then(() => {
    return knex('companyimages').insert([
      {id: 1, company_id: '', company_image: ''},
      {id: 1, company_id: '', company_image: ''},
      {id: 1, company_id: '', company_image: ''},
    ]);
  })
  .then(() => {
    return knex('companyprofiles').insert([
      {id: 1, company_id: '', sector: '', about_company: ''},
      {id: 1, company_id: '', sector: '', about_company: ''},
      {id: 1, company_id: '', sector: '', about_company: ''},
    ]);
  })
  .then(() => {
    return knex('joblistings').insert([
      {id: 1, company_id: '', job_title: '', expiry_date: '', job_detail: '', matching_skill: ''},
      {id: 1, company_id: '', job_title: '', expiry_date: '', job_detail: '', matching_skill: ''},
      {id: 1, company_id: '', job_title: '', expiry_date: '', job_detail: '', matching_skill: ''},
    ]);
  })

};
