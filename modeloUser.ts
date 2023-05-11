import bcrypt from "bcryptjs"
import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document{
    username:string,
    password:string,
    encryptPassword(password:string): Promise<string>
    validatedPassword(password:string): Promise<Boolean>
}
    
    const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            min:4,
            lowercase: true

        },
        password: {
            type: String,
            required: true
        }
    })

    userSchema.methods.encryptPassword = async (password: string): Promise<string> =>{
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt)
    }
    userSchema.methods.validatePassword = async function(password:string): Promise<Boolean> {
        return  await bcrypt.compare(password,this.password)
    }

    export default model<IUser>("User", userSchema)
    
    

