// var jwt = require('jsonwebtoken');
// const User = require('../users/user.model')


// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// const generateToken = async (userId) => {
//     try{
//         const user = await User.findById(userId);
//         if(!user){
//             throw new Error("User not found.")
//         }
//         const token  = jwt.sign({userId:user._id, role:user.role}, JWT_SECRET_KEY, {expiresIn:'1h'});
//         return token;
//     }catch (error){


//     }
// }

// module.exports = generateToken

const jwt = require('jsonwebtoken');
const User = require('../users/user.model'); // Ensure the path to your user model is correct

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
    try {
        // Fetch user from the database
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error("User not found.");
        }
        
        // Generate token with user info and an expiry of 1 hour
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET_KEY, { expiresIn: '1h' });
        
        return token;
    } catch (error) {
        // Log the error to track issues
        console.error("Error generating token:", error.message);
        throw new Error("Token generation failed.");
    }
};

module.exports = generateToken;
