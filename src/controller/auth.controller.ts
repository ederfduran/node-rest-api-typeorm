import { Request, Response } from "express";
import { RegisterValidation } from '../validation/register.validation';
import { User } from '../entity/user.entity';
import bcryptjs from "bcryptjs"
import { sign, verify } from "jsonwebtoken";

export const Register = async  (req: Request, res: Response) => {
    const { body } = req;
    const { error } = RegisterValidation.validate(body);
    if ( error ) {
        return res.status(400).send(error.details)
    }
    if (body.password !== body.password_confirm) {
        return res.status(400).send(
            {
                message: "Password do not match"
            }
        )
    }
    const { first_name, last_name, email, password:pass, role_id} = body; 
    
    const user_save = User.create({
        first_name : first_name,
        last_name : last_name,
        email : email,
        password : await bcryptjs.hash(pass, 10),
        role : role_id
    });
    
    const {password, ...user} = await user_save.save();
    res.send(user);
}

export const Login = async (req: Request, res: Response) => {
    const {email, password:pass } = req.body
    const user = await User.findOneBy({ email })
    if ( !user || !await bcryptjs.compare(pass, user.password) ) {
        return res.status(400).send(
            {message: 'invalid credentials'}
        )
    }
    const token = sign({
        id: user.id
    }, process.env.SECRET_KEY)

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // one day
    })
    res.send({
        message: 'success'
    });
}

export const AuthenticatedUser =  async (req: Request, res: Response) => {
    const {password, ...user} = req['user'];
    res.send(user)
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 0});
    res.send({
        message : 'success'
    })
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req['user'];
    await User.update(user.id, req.body);
    const { password, ...userRead } = await User.findOneBy({id: user.id});
    res.send(userRead);
}

export const UpdatePassword =  async (req: Request, res: Response) =>  {
    const user = req['user'];
    const { password, password_confirm } = req.body;
    if ( password != password_confirm ) {
        return res.status(400).send(
            {message: 'passwords do not match'}
        )
    }
    await User.update(user.id, { password: await bcryptjs.hash(password, 10)});
    const { password:pass, ...userRead} = user;
    res.send(userRead);
}