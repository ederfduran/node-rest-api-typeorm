import express, { Router } from "express";
import { Register, 
        Login,
        AuthenticatedUser,
        Logout, UpdateInfo,
        UpdatePassword
    } from './controller/auth.controller';
import { Users,
        CreateUser,
        GetUser,
        UpdateUser,
        DeleteUser } from "./controller/user.controller"
import { Permissions } from "./controller/permission.controller";
import { Roles,
        CreateRole,
        GetRole,
        UpdateRole,
        DeleteRole} from "./controller/role.controller";
import { AuthMiddleware } from "./middleware/auth.middleware"
import { PermissionMiddleware } from "./middleware/permission.middleware";
import { Products,
        GetProduct,
        UpdateProduct,
        CreateProduct,
        DeleteProduct} from "./controller/product.controller";
import { Upload } from "./controller/image.controller"
import { Orders, Export } from "./controller/order.controller";

export const routes = (router: Router) => {
    // Manage account
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/logout', AuthMiddleware, Logout)
    router.put('/api/user/info', AuthMiddleware, UpdateInfo)
    router.put('/api/user/password', AuthMiddleware, UpdatePassword)

    // Manage Users
    router.get('/api/users', AuthMiddleware, PermissionMiddleware('users'), Users)
    router.post('/api/users', AuthMiddleware, PermissionMiddleware('users'), CreateUser)
    router.get('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), GetUser)
    router.put('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), UpdateUser)
    router.delete('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), DeleteUser)

    // Manage Permissions
    router.get('/api/permissions', AuthMiddleware, Permissions);

    // Manage Roles
    router.get('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), Roles);
    router.post('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), CreateRole);
    router.get('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), GetRole);
    router.put('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), UpdateRole);
    router.delete('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), DeleteRole);

    // Manage Products
    router.get('/api/products', AuthMiddleware, PermissionMiddleware('products'), Products);
    router.post('/api/products', AuthMiddleware, PermissionMiddleware('products'), CreateProduct);
    router.get('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), GetProduct);
    router.put('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), UpdateProduct);
    router.delete('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), DeleteProduct);

    router.post('/api/upload', AuthMiddleware, Upload);
    router.use('/api/uploads', express.static('./uploads'));

    // Orders
    router.get('/api/orders', AuthMiddleware, PermissionMiddleware('orders'), Orders);
    router.post('/api/export', AuthMiddleware , PermissionMiddleware('orders'), Export);
}