# Droom-4 Backend

> https://droom-4.herokuapp.com/

**BREAKING NEWS: Check-in frequently to get up-to-date...😀😂** 

* List of API detail. Note: Some of the routes are in progress!!!!

| Method | Endpoint                                  | Description                   | Auth Required |
| ------ | ----------------------------------------- | ----------------------------- | :-----------: |
| GET    | /                                         | Base endpoint                 |      [ ]      |
| GET    | /api/users/                               | Get all users                 |      [x]      |
| GET    | /api/users/:id                            | Get user by id                |      [x]      |
| GET    | /api/users/:id/profile                    | Get user's profile by id      |      [x]      |
| POST   | /api/auth/users/register                  | Register new user             |      [ ]      |
| POST   | /api/auth/users/login                     | Log in user                   |      [ ]      |
| POST   | /api/users/:id/experience                 | Add experience of user        |      [x]      |
| POST   | /api/users/:id/interest                   | Add interest of user          |      [x]      |
| POST   | /api/users/:id/profile                    | Add profile detail of user    |      [x]      |
| POST   | /api/users/:id/upload                     | Upload an user image          |      [x]      |
| PUT    | /api/users/:id                            | Update user by id             |      [x]      |
| PUT    | /api/users/:user_id/experience/:id        | Update user experience by id  |      [x]      |
| PUT    | /api/users/:user_id/interest/:id          | Update user interest by id    |      [x]      |
| PUT    | /api/users/:user_id/profile/:id           | Update user profile           |      [x]      |
| DELETE | /api/users/:id                            | Remove user by id             |      [x]      |
| DELETE | /api/users/:user_id/experience/:id        | Remove user experience by id  |      [x]      |
| DELETE | /api/users/:user_id/interest/:id          | Remove user interest by id    |      [x]      |
| GET    | /api/companies/                           | Get all companies             |      [x]      |
| GET    | /api/companies/:id                        | Get company by id             |      [x]      |
| GET    | /api/companies/:id/profile                | Get company's profile by id   |      [x]      |
| POST   | /api/auth/companies/register              | Register new company          |      [ ]      |
| POST   | /api/auth/companies/login                 | Log in company                |      [ ]      |
| POST   | /api/companies/:id/joblisting             | Add joblisting of company     |      [x]      |
| POST   | /api/companies/:id/profile                | Add profile detail of company |      [x]      |
| POST   | /api/companies/:id/upload                 | Upload a company image        |      [x]      |
| PUT    | /api/companies/:id                        | Update company by id          |      [x]      |
| PUT    | /api/companies/:company_id/joblisting/:id | Update joblisting by id       |      [x]      |
| PUT    | /api/companies/:company_id/profile/:id    | Update company profile        |      [x]      |
| DELETE | /api/companies/:id                        | Remove company by id          |      [x]      |
| DELETE | /api/companies/:company_id/joblisting/:id | Remove job listing by id      |      [x]      |
| POST   | /api/companies/:id/match                  | Add for company swiping right |      [x]      |
| POST   | /api/users/:id/match                      | Add for company swiping right |      [x]      |
| GET    | /api/companies/:id/match                  | Get likes for company by id   |      [x]      |
| GET    | /api/users/:id/match                       | Get likes for user by id     |      [x]      |


> Login needs Authorization Header

```
headers: {
  'Content-Type': 'application/json',
   Authorization: token,
}
```

> Mock User response

* **email**: *kdahal@gmail.com*
* **password**: *lambda123*

```
{
    "0": {
        "id": 7,
        "firstname": "Krishna",
        "lastname": "Dahal",
        "email": "kdahal@gmail.com",
        "password": "$2a$10$TFoOH.ANW4pUhXITCcDQp.wDgVg4NVAcaR6RXWOHBcaNefYzwUdJ2",
        "role": "Job Seeker",
        "created_at": null,
        "updated_at": null
    },
    "images": []
}

```

> Mock Company response

* **email**: *kcorp@gmail.com*
* **password**: *lambda123*

```
{
    "0": {
        "id": 4,
        "companyName": "Krishna Corp.",
        "email": "kcorp@gmail.com",
        "password": "$2a$10$JNYi4Nebmf.ATIjJJZK3w.YPW1mQpHAi1YWkTQc22rAObMXWWSDYS",
        "role": "Hiring Company",
        "created_at": null,
        "updated_at": null
    },
    "images": []
}

```

> Mock User Profile response

```
{
    "interests": [
        {
            "id": 4,
            "interest_area": "Trading"
        }
    ],
    "experiences": [
        {
            "id": 4,
            "company_worked_for": "Apple, Inc.",
            "employment_startdate": "2020-01-01",
            "employment_enddate": null,
            "experience_detail": "I coded for apple."
        },
    ]
}
```

> Mock Company Profile response

```
{
    "joblistings": [
        {
            "id": 4,
            "job_title": "React Developer Needed!",
            "expiry_date": "2020-12-31",
            "job_detail": "Must be from Lambda School",
            "matching_skill": "Programming"
        },
    ]
}
```
