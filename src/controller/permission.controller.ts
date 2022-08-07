import {Request, Response} from "express";
import { Permission } from "../entity/permission.entity";

export const Permissions = async (req: Request, res: Response) => {
    res.send(await Permission.find());
}