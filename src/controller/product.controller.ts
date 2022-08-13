import {Request, Response} from "express";
import {Product} from "../entity/product.entity";

export const Products = async (req: Request, res: Response) => {
    const pageSize = 5;
    const page = parseInt(req.query.page as string || '1');
    const [ data, total ] = await Product.findAndCount({
        take: pageSize,
        skip: (page - 1) * pageSize
    })
    res.send({
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total/pageSize)
        }
    });
}

export const CreateProduct = async (req: Request, res: Response) => {
    const product = await Product.save(req.body)
    res.status(201).send(product);
}

export const GetProduct = async (req: Request, res: Response) => {
    const product = await Product.findOne({ where: { id : parseInt(req.params.id) }});
    res.send(product)
}

export const UpdateProduct = async (req: Request, res: Response) => {
    const newProduct = req.body;
    await Product.update(req.params.id, {
        ...newProduct
    });
    const product = await Product.findOne({ where: { id : parseInt(req.params.id) }});
    res.status(202).send(product);
}

export const DeleteProduct = async (req: Request, res: Response) => {
    await Product.delete(req.params.id);
    res.status(204).send(null);
}