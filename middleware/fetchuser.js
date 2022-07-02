var jwt = require('jsonwebtoken');
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
//fetchUser is a middleware. in this middleware we will check wheather the user is a legit user by using 
// token. and we will add this middleware to the route where we want to check user authentication and then we will run next() function in it. which will
// will run the next middleware.Next is used to pass control to the next middleware function. If not the request will be left hanging or open.
const fetchUser = (req, res, next) => {
    
    // Get the user from the jwt token and add the id of that user to req object.
    // here req.header contains the authentication-token
    const token = req.header("authentication-token");
    // console.log("token", token);
    // if req.header doesn't have authentication-token.
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }

    // adding try and catch to check if the token is valid or not. if token is not valid then catch() will run.
    try {
        // verifying the token using jwt.verify()
        const userData = jwt.verify(token, JWT_PRIVATE_KEY);
        // If verification is successfull then it will give us the data which we sent in authentication-token when user was logged in/created.
        // console.log("userData",userData);
        req.user = userData.user;
        // console.log("req.user",req.user)
        
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    next();
}


module.exports = fetchUser
