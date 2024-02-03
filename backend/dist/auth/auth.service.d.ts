/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto, UpdateUserDto, UserLoginDto } from './dto/user.dto';
import { Response } from 'express';
import { Follower } from 'src/schemas/follower.schema';
export interface ReturnUser {
    id: string;
    username: string;
    fullname: string;
    bio: string;
    dateOfBirth: Date;
    joinedAt: Date;
    followersCount: number;
    followingCount: number;
}
export declare class AuthService {
    private userModel;
    private followerModel;
    private jwtService;
    constructor(userModel: Model<User>, followerModel: Model<Follower>, jwtService: JwtService);
    getUserByUsername(username: string): Promise<ReturnUser>;
    getUsers(excludedUserId: string): Promise<ReturnUser[]>;
    register(userData: CreateUserDto, res: Response): Promise<{
        user: ReturnUser;
        access_token: string;
    }>;
    login(userData: UserLoginDto, res: Response): Promise<{
        user: ReturnUser;
        access_token: string;
    }>;
    logout(res: Response): Promise<void>;
    updateUser(id: string, userData: UpdateUserDto): Promise<ReturnUser>;
    deleteUser(id: string, res: Response): Promise<void>;
    verifyToken(token: string): Promise<{
        user: any;
        access_token: string;
    }>;
    private generateTokenAndSetCookie;
    private passwordEncrypter;
    private createReturnUser;
    private findUser;
    private handleUserConflict;
    private encryptPassword;
    private createNewUser;
    private setCookie;
    private findUserByEmail;
    private isPasswordMatch;
}
