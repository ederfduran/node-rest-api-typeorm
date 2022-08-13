import {Request, Response} from "express";
import { User } from '../entity/user.entity';
import bcyptjs from "bcryptjs";

export const Users = async (req: Request, res: Response) => {
    const pageSize = 5;
    const page = parseInt(req.query.page as string || '1');
    const [ data, total ] = await User.findAndCount({
        take: pageSize,
        skip: (page - 1) * pageSize,
        relations: ['role']
    })
    const usersRead = data.map( ( user ) => {  
        const { password, ...userRead } = user;
        return userRead;
    })
    res.send({
        data: usersRead,
        meta: {
            total,
            page,
            last_page: Math.ceil(total/pageSize)
        }
    });

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