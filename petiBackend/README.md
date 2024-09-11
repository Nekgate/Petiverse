# Backend of Petiverse
- The backend handles the authentication and authorization, Post by user, comment, story and likes. It handles the Chatting and Messaging of User and finding Vetinary Doctor.

- git clone project
- create a *.env* file and store 
- inside the *.env* populate this data {
    MONGODB_URL:URL OF THE MONGODB,
    PORT=PORT YOU WANT,
    JWT_SECRET=ANY CHARACTER OF CHOICE,
    JWT_EXPIRES=HOW LONG JWT EXPIRES,
    URL=URL OF LOCALHOST
    AUTH_EMAIL=your email
    AUTH_PASS=your password
}

## AUTH ROUTES

### registration route
- `/api/v1/auth/registration`
- post route
- accepts a json as required data for registration
- {
    username: must start with a string and can only contain string, number, special character ( _ ),
    fullname: must be only string,
    email: must be an email accepts @info.co.uk,
    password: must contain uppercase, lowercase, special character(@$!%*?&#) and number,
    confirmPassword: same as password,
    phoneNumber: any number upto 8 and not more than 15
}
- yet to implement location(country & state)

### VERIFY ACCOUNT
- `api/v1/auth/verify-email`
- post route
- accepts a json as required data for verification of email
- {
    code: six digit code send to user
}

### login
- `api/v1/auth/login`
- post route
- accept a json as required data for login of user
- {
    email or username
    password
}

### LOGOUT 
- `api/v1/auth/logout`
- post route
- don't accept json


### FORGET PASSWORD
- `api/v1/auth/forgot-password`
- accepts a json as required data for change of password
- {
    email
}

### FETCH
- `api/v1/auth/logout`
- get route
- don't accept json, verifies an authenticated user or logged user

### RESET PASSWORD
- `api/v1/auth/reset-password/:token`
- post route
- accepts a json as required data for change of password
- generated token in the url as params
- {
    password: must contain uppercase, lowercase, special character(@$!%*?&#) and number,
    confirmPassword: same as password,
}

- TODO using node-cron to set delete users who are not verified in 48hrs
## User Routes

### GET ALL VERIFIED USER
- ` api/v1/user/users/verified`
- GET  route
- user must log in to perform

### GET ALL UNVERIFIED USER
- `api/v1/user/users/not-verified`
- GET route
- user must log in to perform

### GET A USER
- `api/v1/user/:userId`
-   GET ROUTE
- user must log in to perform

### GET USERS FOLLOWED BY A USER
- `api/v1/user/following/:userId`
- GET ROUTE
- user must log in to perform

### GET USERS FOLLOWING BY A USER
- `api/v1/user/followers/:userId`
- GET ROUTE
- user must log in to perform

### GET USERS BLACKLISTED BY A USER
- `api/v1/user/blocked/:userId`
- GET ROUTE
- user must log in to perform

### SEARCH A USER ROUTE
- `api/v1/user/search/:query`
- GET ROUTE
- query is any key word will return users with same username or full name
- user must log in to perform

### FOLLOW ANOTHER USER
- `api/v1/user/unfollow/:userId`
- POST ROUTE
- url will contain the userId of the user to be followed
- user must log in to perform

### UNFOLLOW ANOTHER USER
- `api/v1/user/unfollow/:userId`
- POST ROUTE
- url will contain the userId of the user to be unfollowed
- user must log in to perform

### BLOCK ANOTHER USER
- `api/v1/user/block/:userId`
- POST ROUTE
- url will contain the userId of the user to be blocked
- user must log in to perform

### UNBLOCK ANOTHER USER
- `api/v1/user/unblock/:userId`
- POST ROUTE
- url will contain the userId of the user to be unblock
- user must log in to perform

