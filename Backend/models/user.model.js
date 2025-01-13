import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }
    ,
    password: {
        type: String,
        required: true,
        select: false
    }
})

userSchema.statics.hashPassword = async function hashPassword(password) {
    return await bcrypt.hashSync(password, 10);
}
userSchema.methods.isValid = async function isValid(hashedPassword) {    
    return await bcrypt.compareSync(hashedPassword, this.password);
}
userSchema.methods.generateJWT = function generateJWT() {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET);
}
userSchema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        { email: this.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' });
}

const User = mongoose.model('user', userSchema);

export default User;