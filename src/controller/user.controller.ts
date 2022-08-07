import {Request, Response} from "express";
import { User } from '../entity/user.entity';
import bcyptjs from "bcryptjs";

export const Users = async (req: Request, res: Response) => {
    const users = await User.find({
        relations: ['role']
    });
    const usersRead = users.map( ( user ) => {  
        const { password, ...userRead } = user;
        return userRead;
    })
    res.send(usersRead)
}

export const CreateUser = async (req: Request, res: Response) => {
    const { role_id, ...body } = req.body;
    const hashedPassword = await bcyptjs.hash('1234', 10);
    const {password, ...user} = await User.save({
        ...body,
        password: hashedPassword,
        role: {
            id: role_id
        }
    })

    res.status(201).send(user);
}

export const GetUser = async (req: Request, res: Response) => {
    const {password, ...user} = await User.findOne({ where: { id : parseInt(req.params.id) }, relations: ['role']});
    res.send(user);
}

export const UpdateUser = async (req: Request, res: Response) => {
    const {role_id, ...body} = req.body;
    await User.update(req.params.id, {
        ...body,
        role: {
            id: role_id
        }
    });
    const {password, ...user} = await User.findOne({ where: { id : parseInt(req.params.id) }, relations: ['role']});
    res.status(202).send(user);
}

export const DeleteUser = async (req: Request, res: Response) => {
    await User.delete(req.params.id);
    res.status(204).send(null);
}