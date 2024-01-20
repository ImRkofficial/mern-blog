import User from './../models/user.model.js';

export const signUp = async (req,res)=>{
    const {username, email, password} = req.body;
     
    if(!email || !username || !password ){
        res.status(401).json({
            message:"All fields are required"
        })
    }

    const createdUser = new User ({
        username:username.toLowerCase(),
        email:email,
        password:password
    });

    const user = await createdUser.save();

    res.status(201).json({
        user,
        message:"User created successfully"
    })
} 