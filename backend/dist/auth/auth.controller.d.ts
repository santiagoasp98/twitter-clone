import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from './dto/user.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getUserByUsername(username: string): Promise<import("./auth.service").ReturnUser>;
    getUsers(excludedId: string): Promise<import("./auth.service").ReturnUser[]>;
    register(userData: CreateUserDto, res: Response): Promise<{
        user: import("./auth.service").ReturnUser;
        access_token: string;
    }>;
    login(userData: UserLoginDto, res: Response): Promise<{
        user: import("./auth.service").ReturnUser;
        access_token: string;
    }>;
    logout(res: Response): Promise<void>;
    updateUser(id: string, userData: UpdateUserDto): Promise<import("./auth.service").ReturnUser>;
    deleteUser(id: string, res: Response): Promise<void>;
    verifyToken(authHeader: string): Promise<{
        user: any;
        access_token: string;
    }>;
}
