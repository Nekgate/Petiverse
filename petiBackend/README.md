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
}

### registration route
- `/v1/api/auth/registration`
- accepts a json as required data for login
- {
    username,
    fullname,
    email,
    password,
    confirmPassword,
    phoneNumber,
}
- yet to implement location(country & state)