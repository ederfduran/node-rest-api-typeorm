import { Router } from "express";
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
//import { PermissionMiddleware } from "./middleware/permission.middleware";

export const routes = (router: Router) => {
    // Manage account
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/logout', AuthMiddleware, Logout)
    router.put('/api/user/info', AuthMiddleware, UpdateInfo)
    router.put('/api/user/password', AuthMiddleware, UpdatePassword)

    // Manage Users
    router.get('/api/users', AuthMiddleware, Users)
    router.post('/api/users', AuthMiddleware, CreateUser)
    router.get('/api/users/:id', AuthMiddleware, GetUser)
    router.put('/api/users/:id', AuthMiddleware, UpdateUser)
    router.delete('/api/users/:id', AuthMiddleware, DeleteUser)

    // Manage Permissions
    router.get('/api/permissions', AuthMiddleware, Permissions);

    // Manage Roles
    router.get('/api/roles', AuthMiddleware, Roles);
    router.post('/api/roles', AuthMiddleware, CreateRole);
    router.get('/api/roles/:id', AuthMiddleware, GetRole);
    router.put('/api/roles/:id', AuthMiddleware, UpdateRole);
    router.delete('/api/roles/:id', AuthMiddleware, DeleteRole);
}