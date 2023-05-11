import  { Request, Response, json } from 'express'; 
import User, { IUser } from '../modelos/modeloUser';
import jwt  from 'jsonwebtoken';


export const signup = async (req: Request, res: Response) => {
    res.send("signup");
    const user:IUser = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.password = await user.encryptPassword(user.password)
    const savedUser = await user.save();
    const token: string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET ||"tokentest")

    res.header("auth-token", token).json(savedUser)

}
export const signin = async (req: Request, res: Response) => {
    const user = await User.findOne({username: req.body.username})
    if(!user) return res.status(400).json("Username or password is wrong")
    const correctedPassword: Boolean = await user.validatedPassword(req.body.password);
    if(!correctedPassword) return res.status(400).json("Invalid Password")
    
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET || "tokentest",{
        expiresIn: 60 * 60 * 24
    })

    res.header("auth-token", token).json(user);
}
export const profile = (req: Request, res: Response) => {
    if(req.header("auth-token")){
        console.log("Data")
    }
    res.send("profile");
}