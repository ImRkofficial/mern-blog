import  mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 10)
    next();
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}



const User = mongoose.model("User",userSchema);

export default User;