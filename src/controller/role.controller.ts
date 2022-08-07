import {Request, Response} from "express";
import { Role } from '../entity/role.entity';

export const Roles = async (req: Request, res: Response) => {
    res.send(await Role.find());
}

export const CreateRole = async (req: Request, res: Response) => {
    const {name, permissions} = req.body;
    const role = await Role.save({
        name,
        permissions: permissions.map(id => ({id}))
    });
    res.status(201).send(role);
}

export const GetRole = async (req: Request, res: Response) => {
    const role = await Role.findOne({ where: { id : parseInt(req.params.id) }, relations: ['permissions']});
    res.send(role)
}

export const UpdateRole = async (req: Request, res: Response) => {
    const {name, permissions} = req.body;
    const role = await Role.save({
        id: parseInt(req.params.id),
        name,
        permissions: permissions.map(id => ({id}))
    });
    res.status(202).send(role);
}

export const DeleteRole = async (req: Request, res: Response) => {
    await Role.delete(req.params.id);
    res.status(204).send(null);
}