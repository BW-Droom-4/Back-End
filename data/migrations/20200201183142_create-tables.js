
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl =>{
        tbl.increments('id');
        tbl.string('firstname')
           .notNullable();
        tbl.string('lastname')
           .notNullable();  
        tbl.string('email')
           .notNullable().unique();        
        tbl.string('password')
           .notNullable();
        tbl.string('role')
           .defaultTo('Job Seeker');
        tbl.timestamps (true, true)
    })
    .createTable('userimages', tbl => {
        tbl.increments('id');
        tbl.integer('user_id')
           .unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.string('user_image')
           .notNullable();
    })
    .createTable('userprofiles', tbl => {
        tbl.increments('id');
        tbl.integer('user_id')
           .unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.string('occupation_title')
           .notNullable()
        tbl.text('about_user')
           .notNullable();
        tbl.integer('years_of_experience')
           .notNullable();
    })
    .createTable('userexperiences', tbl => {
        tbl.increments('id');
        tbl.integer('user_id')
           .unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.string('company_worked_for')
           .notNullable();
        tbl.date('employment_startdate')
           .notNullable();
        tbl.date('employment_enddate');
        tbl.text('experience_detail')
           .notNullable();
    })
    .createTable('userinterests', tbl => {
        tbl.increments('id');
        tbl.integer('user_id')
           .unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.enum('interest_area', 
            ['Programming', 'Web Development', 'Mobile Development', 'Marketing', 'Sales', 'Finance',
            'Music', 'Film-Making', 'Research', 'Trading', 'Data Science', 'Design', 'Services'])
           .defaultTo('Programming');
    })



    .createTable('companies', tbl => {
        tbl.increments('id');
        tbl.string('companyName')
           .notNullable().index();
        tbl.string('email')
           .notNullable().unique();
        tbl.string('password')
           .notNullable();
        tbl.string('role')
           .defaultTo('Hiring Company')
        tbl.timestamps(true, true);
    })
    .createTable('companyimages', tbl => {
        tbl.increments('id');
        tbl.integer('company_id')
           .unsigned().notNullable().references('id').inTable('companies').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.string('company_image')
           .notNullable();
    })
    .createTable('companyprofiles', tbl => {
        tbl.increments('id');
        tbl.integer('company_id')
           .unsigned().notNullable().references('id').inTable('companies').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.enum('sector',
            ['Programming', 'Web Development', 'Mobile Development', 'Marketing', 'Sales', 'Finance',
            'Music', 'Film-Making', 'Research', 'Trading', 'Data Science', 'Design', 'Services'])
           .defaultTo('Programming')
        tbl.text('about_company')
           .notNullable();
    })
    .createTable('joblistings', tbl => {
        tbl.increments('id');
        tbl.integer('company_id')
           .unsigned().notNullable().references('id').inTable('companies').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.string('job_title')
           .notNullable();
        tbl.timestamps(true, true);
        tbl.date('expiry_date');
        tbl.text('job_detail')
           .notNullable();
        tbl.enum('matching_skill',
           ['Programming', 'Web Development', 'Mobile Development', 'Marketing', 'Sales', 'Finance',
           'Music', 'Film-Making', 'Research', 'Trading', 'Data Science', 'Design', 'Services'])
       .defaultTo('Programming')    
    })

    .createTable('userlikedcompany', tbl => {
      tbl.increments('id');
      tbl.integer('user_id')
         .unsigned().notNullable().references('id').inTable('companies').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.integer('company_id')
         .unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.boolean('user_liked').defaultTo(false);
   })
   .createTable('companylikeduser', tbl => {
      tbl.increments('id');
      tbl.integer('user_id')
         .unsigned().notNullable().references('id').inTable('companies').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.integer('company_id')
         .unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.boolean('company_liked').defaultTo(false);
   })
};
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('userimages')
    .dropTableIfExists('userprofiles')
    .dropTableIfExists('userexperiences')
    .dropTableIfExists('userinterests')
    .dropTableIfExists('companies')
    .dropTableIfExists('companyimages')
    .dropTableIfExists('companyprofiles')
    .dropTableIfExists('userlikedcompany')
    .dropTableIfExists('companylikeduser')
};
