# Petiverse API Tutorial

> Petiverse Reference Documentation is a catalog of all predefined API components—requests, documentation, authorization, variables, and examples—into an organized asset library for faster onboarding of new team members. 
  

# Table of Content

Quick Guild to run the application

## Quick Guild to Start the Application

### Prerequisites

Before starting the application, ensure the following tools and services are installed and properly set up:

1. Node.js & NPM
    
    - Download the latest version of Node.js from [Node.js official website](https://nodejs.org/). It will automatically install npm as well.
        
    - Linux: Use your terminal to install Node.js and npm:  
        **sudo apt update****sudo apt install nodejs npm**
        
    - Mac: Install Node.js and npm via \[Homebrew\]([https://brew.sh/](https://brew.sh/)):  
        **brew install node**
        
2. Redis Server
    
    - Install Redis on your system. For example:
        
        - Linux:  
            **sudo apt install redis-server**
            
        - Mac:  
            **brew install redis**
            
        - Windows:  
            Install via [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) or download Redis from the [official Redis website](https://redis.io/downloads/).
            
        - Ensure Redis is running:
            
            - Linux/Mac: Start the Redis service using:  
                **sudo service redis-server start**  
                or  
                **sudo systemctl start redis-server**
                
        - Verify Redis Installation: Test if Redis is running by using the **redis-cli**:
            
            **redis-cli ping**
            
        - If Redis is active, it will return **PONG**.
            

### Steps to Set Up the Application

1. Clone the Project
    
    - Open your terminal and clone the repository from GitHub into your local machine:  
        **git clone** [<b>https://github.com/Nekgate/Petiverse</b>](https://github.com/Nekgate/Petiverse)**
        
2. Navigate to the Project Directory
    
    - Change your working directory to the project folder:  
        **cd Petiverse/petiBackend**
        
3. Install Dependencies
    
    - Once inside the backend directory **petiBackend**, install the necessary dependencies by running:  
        **npm install**
        
4. Set Up MongoDB
    
    - Head over to the [MongoDB website](https://www.mongodb.com/) and sign up for an account if you don’t have one.
        
    - Create a project in MongoDB Atlas and get the API key for Node.js (you'll use this later in your environment variables).
        
5. Set Up Cloudinary
    
    - Go to [Cloudinary](https://cloudinary.com/) and create an account.
        
    - After signing up, retrieve your cloud_name, API Key, and API Secret.
        
    - Create different preset which are folders with the following names:  
        **profilePicture**  
        **coverPicture**  
        **post**  
        **story**
        
6. Get Gmail App Password
    
    - Go to your Gmail account and generate an App Password for sending emails from your application. Follow [this guide](https://medium.com/@piusrestiantoro02/how-to-generate-a-gmail-app-password-0e71cd41fd3c) to generate the app password.
        
    - save the app password to be used later.
        

### Running the Application

With everything set up, you're now ready to run the application:

1. Set Up Environment Variables
    
    - Create a **.env** file in your project’s root directory **petiBackend** and add the following keys:  
        **MONGODB_URL=your-mongodb-uri**  
        **PORT=your-desired-port-for-backend**  
        **JWT_SECRET=your-choice-of-string or user crypto to get one**  
        **JWT_EXPIRES=your-desired-duration-for-jwt e.g.(1h,1d,1m)**  
        **URL=your-domain-url or localhost url**  
        **AUTH_EMAIL=your-gmail**  
        **AUTH_PASS=your-gmail-app-password**  
        **CLOUDINARY_NAME=your-cloudinary-cloud-name**  
        **CLOUDINARY_API_KEY=your-cloudinary-api-key**  
        **CLOUDINARY_API_SECRET=your-cloudinary-api-secret**  
        **REDIS_URL=redis url**
        
2. Start the Application
    

\- Run the application using:

**npx nodemon index.js**

You have to login to consume every route apart from Auth routes

## Any error not documented will return 500, it is not solely server error it means server had a bridge

# To View proper documentation when server is running
```bash
http://localhost:5000/petiverse-api-docs/
```

## AUTH ROUTES

### registration route
- `/api/v1/auth/register`
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

"username":"gab",
"fullname":"gab crof",
"phoneNumber":"08100000000",
"email":"user@mail.com",
"password":"Admin123$",
"confirmPassword":"Admin123$"
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
- `api/v1/auth/refetch`
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
- `api/v1/user/find/:userId`
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
{
    bio=info about pet,
    fullname=the real name of pet
}

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

### CREATE A COMMENT IN A POSTID
- `/api/v1/comment/create/:postId`
- POST ROUTE
- takes the postId from the params
- takes text from the body
- get userId from cookie
- {
    text:text 
}

### CREATE REPLY OF A COMMENT
- `/api/v1/comment/reply/:commentId`
- POST ROUTE
- takes the commentId from the params
- takes text from the body
- get userId from cookie
- {
    text:text 
}

### UPDATE A COMMENT
- `/api/v1/comment/update/:commentId`
- PUT ROUTE
- takes the commentId from the params
- takes text from the body
- get userId from cookie
- {
    text:text 
}

### UPDATE A REPLY
- `/api/v1/comment/update/:commentId/replies/:replyId`
- PUT ROUTE
- takes the commentId and replyId from the params
- takes text from the body
- get userId from cookie
- {
    text:text 
}

### GET ALL COMMENT IN A POST
- `/api/v1/comment/post/:postId`
- GET ROUTE
- takes the postId from the params
- get userId from cookie

### DELETE A COMMENT
- `/api/v1/comment/delete/:commentId`
- DELETE ROUTE
- takes the commentId from the params
- get userId from cookie

### DELETE A REPLY IN COMMENT
- `/api/v1/comment/:commentId/replies/:replyId`
- DELETE ROUTE
- takes the commentId and replyId from the params
- get userId from cookie

### LIKE A COMMENT
- `/api/v1/comment/like/:commentId`
- POST ROUTE
- takes the commentId from the params
- get userId from cookie

### UNLIKE A COMMENT
- `/api/v1/comment/dislike/:commentId`
- POST ROUTE
- takes the commentId from the params
- get userId from cookie

### LIKE A REPLY IN A COMMENT
- `/api/v1/comment/:commentId/replies/like/:replyId`
- POST ROUTE
- takes the commentId and replyId from the params
- get userId from cookie

### UNLIKE A REPLY IN A COMMENT
- `/api/v1/comment/:commentId/replies/dislike/:replyId`
- POST ROUTE
- takes the commentId and replyId from the params
- get userId from cookie

## CONVERSATION

### INITIATE A CONVERSATION WITH ANOTHER USER
- `/api/v1/chat/create/:secondUserId`
- POST ROUTE
- takes the secondUserId in the url, and the logged UserId from cookie
- get loggedUser from cookie, user must be logged

### GET ALL LOGGED IN USER CONVERSATION
- `/api/v1/chat/all/user`
- GET ROUTE
- return the list of all conversation the user is engaged in
- get loggedUser from cookie

### DELETE A CONVERSATION OF LOGGED IN USER
- `/api/v1/chat/deletw/:conversationId`
- DELETE ROUTE
- takes the conversationId from the Url, ensure the user is part of the conversation
- get loggedUser from cookie

## MESSAGE

### WRITE A MESSAGE IN A CONVERSATION
- `/api/v1/messages/chat/:conversationId/create`
- POST ROUTE
- takes the text from the body and conversationId from url
- get loggedUser from cookie, user must be logged

### EDIT MESSAGE
- `/api/v1/messages/chat/:conversationId/edit/:messageId`
- POST ROUTE
- takes the text from the body and conversationId from url
- get loggedUser from cookie, user must be logged

### GET ALL MESSAGE IN A CONVERSATION
- `/api/v1/messages/:conversationId`
- GET ROUTE
- takes the conversationId from url
- get loggedUser from cookie, user must be logged

### DELETE A MESSAGE
- `/api/v1/messages/delete/:messageId`
- DELETE ROUTE
- takes the messageId from url
- it check if user is the owner of the id
- get loggedUser from cookie, user must be logged

## STORY

### CREATE A STORY
`api/v1/story/create`
- POST ROUTE
- takes text
- get userId from cookie
- push the image to cloudinary and generate a url 
- {
    text:text
}

### CREATE A STORY
`api/v1/story/create-image`
- POST ROUTE
- takes a file form data of image in jpg, png, jpeg
- get userId from cookie
- push the image to cloudinary and generate a url 
- {
    image: image
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