const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


//@desc register a user
//@route /api/users
//@access public

const registerUser =asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    //validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error('please include all the fields')
        
    }

    //check for duplicate 
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash password 
    const hashedPassword = await bcrypt.hash(password,10)
    
    //create and save a user
    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email: user.email,
            token :generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error('something went wrong')
    }
    
})

//@desc login a user
//@route /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}= req.body

    if(!email || !password){
        res.status(400)
        throw new Error("please include all the fields")
        
    }
    //find the user 
    const user = await User.findOne({email})
    //check if the user exists and pssswords match
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id : user._id,
            name:user.name,
            email :user.email,
            token :generateToken(user._id)


        })
    }else{
        res.status(401)
        throw new Error('something went wrong')
        
    }
   
})

//@desc get the current user
//@route /api/users/me
//@access private
const getMe = async (req,res)=>{
    const user={
        _id :req.user._id,
        email:req.user.email,
        name:req.user.name
    }
    res.status(200).json(user)
}

//gennerate token 
const generateToken =(id)=>{
     return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn :'30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}