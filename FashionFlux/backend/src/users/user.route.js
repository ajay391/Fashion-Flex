const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/register', async (req,res) => {
    try{
        // console.log(req.body)
        const {username,email,password} = req.body;
        const user = new User({email,username,password});
        await user.save();
        res.status(201).send({message: "User registered successfully"})
    }catch(error){
        console.log("Error register user", error);
        res.status(500).send({message:"Error registering user"})
    }
})

// router.post('/login', async (req,res)=>{
//     const{email,password} = req.body;

//     const user = await User.findOne({email})
//     if(!user){
//         return res.status(404).send({message:"Invalid Credentials"})

//     }
//     const isMatch = await user.comparePassword(password);
//     if(!isMatch){
//         return res.status(404).send({message:"user not found"})
//     }

//     res.status(200).send({message:'Logged in successfully',user})
// })


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        const token = await generateToken(user._id)
        // console.log(token)

        res.cookie('token', token, {
            httpOnly:true,
            secure:false,
            sameSite: 'strict'
        })

        res.status(200).send({ message: "Logged in successfully",token, user:{
            _id:user._id,
            email:user.email,
            username:user.username,
            role:user.role,
            profileImage:user.profileImage,
            bio:user.bio
        } });

        // const { password: _, ...userWithoutPassword } = user.toObject();
        // res.status(200).send({ message: "Logged in successfully", user: userWithoutPassword });

    } catch (error) {
        console.error("Error during login", error);
        res.status(500).send({ message: "Error during login" });
    }
});

// router.get("/users",verifyToken, async(req, res) => {
//     res.send({message:"Protected user"})
// });
// logout
router.post("/logout", async(req, res) => {
    res.clearCookie('token')
    res.status(200).send({message:"logged out successfully"})
});

router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const user = await User.findByIdAndDelete(id);

        // If no user found, return a 404 error
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ message: "Error deleting user" });
    }
});

router.get('/users', async(req, res) => {
    try{
        const users = await User.find({}, 'id email role').sort({createdAt: -1});
        res.status(200).send(users)
    }catch (error) {
        console.error("Error fetching user", error);
        res.status(500).send({ message: "Error fetching user" });
    }
})
// update
router.put('/users/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const {role} = req.body;
        const user = await User.findByIdAndUpdate(id, {role}, {new: true});

        if(!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "role updated" , user});

    }catch (error) {
        console.error("Error updating user role", error);
        res.status(500).send({ message: "Error updating user role" });
    }
})

router.patch('/edit-profile', async(req, res) => {
    try{
        const {userId, username, profileImage, bio, profession} = req.body;
        if(!userId){
            return res.status(400).send({ message: "User ID is Required" });
        }

        const user = await User.findById(userId)
        // console.log(user)
        if(!user){
            return res.status(400).send({ message: "User not Found" });
        }

        if(username !== undefined) user.username = username;
        if(profileImage !== undefined) user.profileImage = profileImage;
        if(bio !== undefined) user.bio = bio;
        if(profession !== undefined) user.profession = profession;

        await user.save();
        res.status(200).send({ message: "Logged in successfully", user:{
            _id:user._id,
            email:user.email,
            username:user.username,
            role:user.role,
            profileImage:user.profileImage,
            bio:user.bio
        } });

    }catch (error) {
        console.error("Error updating user profile", error);
        res.status(500).send({ message: "Error updating user profile" });
    }
})

module.exports = router;