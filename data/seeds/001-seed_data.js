
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
      {id: 1, firstname: 'Harry', lastname: 'Ben', email: 'hb@gmail.com', password: '123456qwerty'},
      {id: 2, firstname: 'Larry', lastname: 'Ken', email: 'lk@yahoomail.com', password: 'qwerty123456'},
      {id: 3, firstname: 'Garry', lastname: 'Sen', email: 'gs@gmail.com', password: 'ytrewq654321'},
    ]);
  })

  .then(() => {
    return knex('userimages').insert([
      {id: 1, user_id: '1', user_image: 'x.jpeg'},
      {id: 2, user_id: '2', user_image: 'y.png'},
      {id: 3, user_id: '3', user_image: 'z.jpeg'},
    ]);
  })

  .then(() => {
    return knex('userprofiles').insert([
      {id: 1, user_id: '1', occupation_title: 'Front-End Developer', about_user: 'I am cool', years_of_experience: '2'},
      {id: 2, user_id: '2', occupation_title: 'Marketing Manager', about_user: 'I am great', years_of_experience: '3'},
      {id: 3, user_id: '3', occupation_title: 'Crypto Trader', about_user: 'I am awesome', years_of_experience: '5'},
    ]);
  })

  .then(() => {
    return knex('userexperiences').insert([
      {id: 1, user_id: '1', company_worked_for: 'Apple, Inc.', employment_startdate: '2018-01-01', employment_enddate: '', experience_detail: 'I code.'},
      {id: 2, user_id: '2', company_worked_for: 'Microsoft', employment_startdate: '2017-01-01', employment_enddate: '', experience_detail: 'I market.'},
      {id: 3, user_id: '3', company_worked_for: 'Binance', employment_startdate: '2015-01-01', employment_enddate: '', experience_detail: 'I trade.'},
    ]);
  })
  .then(() => {
    return knex('userinterests').insert([
      {id: 1, user_id: '1', interest_area: 'Programming'},
      {id: 2, user_id: '2', interest_area: 'Marketing'},
      {id: 3, user_id: '3', interest_area: 'Trading'},
    ]);
  })
  .then(() => {
    return knex('companies').insert([
      {id: 1, companyName: 'Apple, Inc.', email: 'apple@apple.com', password: '123456qwerty'},
      {id: 2, companyName: 'Google, Inc.', email: 'google@gmail.com', password: 'qwerty123456'},
      {id: 3, companyName: 'Reddit, Inc.', email: 'reddit@gmail.com', password: 'ytrewq654321'},
    ]);
  })
  .then(() => {
    return knex('companyimages').insert([
      {id: 1, company_id: '1', company_image: 'a.png'},
      {id: 2, company_id: '2', company_image: 'b.png'},
      {id: 3, company_id: '3', company_image: 'c.png'},
    ]);
  })
  .then(() => {
    return knex('companyprofiles').insert([
      {id: 1, company_id: '1', sector: 'Programming', about_company: 'This is good company.'},
      {id: 2, company_id: '2', sector: 'Programming', about_company: 'This is awesome company.'},
      {id: 3, company_id: '3', sector: 'Programming', about_company: 'This is great company.'},
    ]);
  })
  .then(() => {
    return knex('joblistings').insert([
      {id: 1, company_id: '1', job_title: 'React Developer', expiry_date: '2020-12-31', job_detail: 'This is job detail. Do you know react?', matching_skill: 'Programming'},
      {id: 2, company_id: '2', job_title: 'React Developer', expiry_date: '2020-12-31', job_detail: 'Must have 2 years of react experience', matching_skill: 'Programming'},
      {id: 3, company_id: '3', job_title: 'Back-End Developer', expiry_date: '2020-12-31', job_detail: 'Must have experience in nodejs and express', matching_skill: 'Programming'},
    ]);
  })

};
