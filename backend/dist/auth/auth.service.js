"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const bcryptjs_1 = require("bcryptjs");
const follower_schema_1 = require("../schemas/follower.schema");
const ERROR_CODE_PASSWORD_ENCRYPTION = 'P.E.';
let AuthService = class AuthService {
    constructor(userModel, followerModel, jwtService) {
        this.userModel = userModel;
        this.followerModel = followerModel;
        this.jwtService = jwtService;
    }
    async getUserByUsername(username) {
        const user = await this.userModel.findOne({ username: username });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.createReturnUser(user);
    }
    async getUsers(excludedUserId) {
        const following = await this.followerModel.find({
            follower: excludedUserId,
        });
        const followingIds = following.map((userFollowing) => userFollowing.following);
        const usersNotFollowed = await this.userModel
            .find({ _id: { $nin: [...followingIds, excludedUserId] } })
            .limit(3);
        const returnUsers = usersNotFollowed.map((user) => this.createReturnUser(user));
        const resolvedReturnUsers = await Promise.all(returnUsers);
        return resolvedReturnUsers;
    }
    async register(userData, res) {
        const userFound = await this.findUser(userData);
        if (userFound) {
            this.handleUserConflict(userFound, userData);
        }
        const encryptedPassword = await this.encryptPassword(userData.password);
        const savedUser = await this.createNewUser(userData, encryptedPassword);
        return this.generateTokenAndSetCookie(savedUser, res);
    }
    async login(userData, res) {
        const userFound = await this.findUserByEmail(userData.email);
        if (!userFound ||
            !(await this.isPasswordMatch(userData.password, userFound.password))) {
            throw new common_1.NotFoundException('Invalid credentials');
        }
        return this.generateTokenAndSetCookie(userFound, res);
    }
    async logout(res) {
        res.clearCookie('access_token');
        res.status(200).json({ message: 'Logged out' });
    }
    async updateUser(id, userData) {
        let updatedUser;
        try {
            updatedUser = await this.userModel.findByIdAndUpdate(id, userData, {
                new: true,
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Update failed');
        }
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.createReturnUser(updatedUser);
    }
    async deleteUser(id, res) {
        let deletedUser;
        try {
            deletedUser = await this.userModel.findByIdAndDelete(id);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Delete failed');
        }
        if (!deletedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        res.status(200).json({ message: 'User deleted' });
    }
    async verifyToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            return {
                user: payload.user,
                access_token: token,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async generateTokenAndSetCookie(user, res) {
        const returnUser = await this.createReturnUser(user);
        const payload = { user: returnUser };
        const access_token = await this.jwtService.signAsync(payload);
        this.setCookie(res, access_token);
        return {
            user: returnUser,
            access_token: access_token,
        };
    }
    async passwordEncrypter(pass) {
        const passwordHash = await (0, bcryptjs_1.hash)(pass, 10);
        return passwordHash;
    }
    async createReturnUser(user) {
        const followersCount = await this.followerModel.countDocuments({
            following: user._id.toString(),
        });
        const followingCount = await this.followerModel.countDocuments({
            follower: user._id.toString(),
        });
        return {
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            bio: user.bio,
            dateOfBirth: user.dateOfBirth,
            joinedAt: user.createdAt,
            followersCount: followersCount,
            followingCount: followingCount,
        };
    }
    async findUser(userData) {
        return this.userModel.findOne({
            $or: [{ username: userData.username }, { email: userData.email }],
        });
    }
    handleUserConflict(userFound, userData) {
        if (userFound.username === userData.username) {
            throw new common_1.ConflictException('Username is already in use');
        }
        else if (userFound.email === userData.email) {
            throw new common_1.ConflictException('Email is already in use');
        }
    }
    async encryptPassword(password) {
        try {
            return await this.passwordEncrypter(password);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(`Something went wrong. Code: ${ERROR_CODE_PASSWORD_ENCRYPTION}`);
        }
    }
    async createNewUser(userData, encryptedPassword) {
        const newUser = new this.userModel({
            username: userData.username,
            email: userData.email,
            fullname: userData.fullname,
            dateOfBirth: userData.dateOfBirth,
            password: encryptedPassword,
        });
        return newUser.save();
    }
    setCookie(res, token) {
        res.cookie('access_token', token);
    }
    async findUserByEmail(email) {
        return this.userModel.findOne({ email: email });
    }
    async isPasswordMatch(inputPassword, storedPassword) {
        return (0, bcryptjs_1.compare)(inputPassword, storedPassword);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(follower_schema_1.Follower.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map