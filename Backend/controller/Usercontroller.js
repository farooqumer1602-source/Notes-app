const express = require('express');
const User = require('../model/Usermodel');
const jwt = require('jsonwebtoken');

const register = async (req,res)=> {
    const {username , email , password} = req.body;
   try{
     if(!username || !email || !password){
       return res.status(400).json({message:'Please fill all the fields'})
    }
    const userexist = await User.findOne({email})
    if(userexist){
       return  res.status(400).json({message:'User already exists'})
    }
    const newuser = await User.create({username, email,password})
    const token = generateToken(newuser._id)
    res.json({
        id:newuser._id,
        username:newuser.username,
        email:newuser.email,
        token
    })
   }catch(err){
    console.log(err)
    res.status(500).json({message:"sever error"})
   }
};

const login = async (req,res)=> {
    const {email, password } = req.body;
    try{
    const user = await User.findOne({email});
    if(!user || !(await user.matchpassword(password))){
       return res.status(400).json({message:'Invalid credential'});
    }
    const token = generateToken(user._id)
    res.json({
        id:user._id,
        username:user.username,
        email:user.email,
        token
    })
    }catch(err){
    res.status(500).json({message:"sever error"})
    }
};

const me = async (req,res)=>{
  res.json(req.user)
}

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET_KEY , { expiresIn: "30d" })
}



module.exports = {register,login,me}