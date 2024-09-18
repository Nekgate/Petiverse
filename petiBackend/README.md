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
    CLOUDINARY_NAME=cloudinary name
    CLOUDINARY_API_KEY=cloudinary api name
    CLOUDINARY_API_SECRET=cloudinary api secret key
    REDIS_URL=redis url
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

### DELETE ACCOUNT FOR USER
- `api/v1/user/delete`
- DELETE ROUTE
- url will contain the userId, in other to delete
- user must log in to perform

### UPDATE BIO OR FULL NAME OR BOTH
- `api/v1/user/update`
- PUT ROUTE
- userId will be gotten from cookie

### UPDATE THE PROFILE PICTURE
- `api/v1/user/update-profile-picture`
- PUT ROUTE
- takes a file form data of image in jpg, png, jpeg
- get userId from cookie
- push the image to cloudinary and generate a url
- {
    profilePicture: image
}


### UPDATE THE COVER PICTURE
`api/v1/user/update-cover-picture`
- PUT ROUTE
- takes a file form data of image in jpg, png, jpeg
- get userId from cookie
- push the image to cloudinary and generate a url 
- {
    coverPicture: image
}


## POST

### CREATE POST WITH ONLY TEXT
- `/api/v1/post/create`
- POST ROUTE
- takes caption or text for post and visibility
- get userId from cookie
- {
    caption:text,
    visibility:public||friends however friends is 
}

### CREATE POST WITH IMAGES
- `/api/v1/post/create-post`
- POST ROUTE
- takes caption or text for post, images not more than 5 and visibility
- get userId from cookie
- {
    images
    caption:text,
    visibility:public||friends however friends is 
}

### UPDATE TEXT IN BOTH POST NOT IMAGE
- `/api/v1/post/update/:postId`
- PUT ROUTE
- takes caption or text
- get userId from cookie
- {
    caption:text 
}

### UPDATE POST VISIBILITY
- `/api/v1/post/update/visibility/:postId`
- PUT ROUTE
- takes visibilty as public or friends
- get userId from cookie
- {
    visibility:public||friends
}

### DELETE POST
- `/api/v1/post/delete/:postId`
- DELETE ROUTE
- takes the postId in the url
- get userId from cookie

### LIKE POST
- `/api/v1/post/like/:postId`
- POST ROUTE
- takes the postId in the url
- get userId from cookie

### UNLIKE POST
- `/api/v1/post/dislike/:postId`
- POST ROUTE
- takes the postId in the url
- get userId from cookie

### GET POST OF USERS THAT ARE PUBLIC AND USER FOLLOWING
- `/api/v1/post/all`
- GET ROUTE
- get userId from cookie

### GET A POST OF USERS THAT ARE PUBLIC AND USER FOLLOWING
- `/api/v1/post/:postId`
- GET ROUTE
- takes the postId in the url
- get userId from cookie

### GET A USER POST
- `/api/v1/post/user/:userId/post/:postId`
- GET ROUTE
- takes the userId and postId in the url
- get loggedUser from cookie

### GET ALL USER POSTS
- `/api/v1/post/userId/posts`
- GET ROUTE
- takes the userId in the url
- get loggedUser from cookie

### GET LOGGED USER POSTS
- `/api/v1/post/users/posts`
- GET ROUTE
- this finds all userId posts
- get userId from cookie

### GET A LOGGED USER POST
- `/api/v1/post/user/:postId`
- GET ROUTE
- takes the postId in the url 
- the post belongs to userId
- get userId from cookie

### TOBE DELETE ROUTE.....GET ALL POST WITHOUT USER
- `/api/v1/post/admin/all/posts`
- GET ROUTE
- returns all post both public and friends

## COMMENT

## CONVERSATION

### INITIATE A CONVERSATION WITH ANOTHER USER

### GET ALL LOGGED IN USER CONVERSATION

### DELETE A CONVERSATION OF LOGGED IN USER

## MESSAGE

## STORY

### CREATE A STORY
`api/v1/story/create`
- POST ROUTE
- takes a file form data of image in jpg, png, jpeg or text or both
- get userId from cookie
- push the image to cloudinary and generate a url 
- {
    image: image
    text:text
}

### GET ALL STORY OF USERS A USER IS FOLLOWING
`api/v1/story/all/user/following`
- GET ROUTE
- get userId from cookie

### GET ALL STORY OF A USER
`api/v1/story/user/stories`
- GET ROUTE
- get userId from cookie

### DELETE A SINGLE STORY OF A USER
- `api/v1/story/delete/:storyId`
- DELETE ROUTE
- url will contain the storyId, in other to delete
- user must log in to perform

### DELETE ALL STORIES OF A USER
- `api/v1/story/delete/all/user/stories`
- DELETE ROUTE
- the cookie will contain the userId, in other to delete
- user must log in to perform