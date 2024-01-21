import User from './../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signUp = async (req,res)=>{
    const {username, email, password} = req.body;
     
    if(!email || !username || !password ){
       return res.status(401).json({
            message:"All fields are required"
        })
    }

    const existedUser = await User.findOne({email});

    if(existedUser){
      return  res.status(500).json({
            success:false,
            message:"User already exists"
        })
    }

    const hashPassword = bcryptjs.hashSync(password,10)

    const createdUser = new User ({
        username:username.toLowerCase(),
        email:email,
        password:hashPassword
    });

   try {
    const user = await createdUser.save();

  return  res.status(201).json({
        user,
        message:"Signup Successfull"
    })
   } catch (error) {
    return  res.status(400).json({
        message:error.message,
        success:false
    })
   }
} ;


