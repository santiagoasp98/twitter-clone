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
exports.FollowersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const follower_schema_1 = require("../schemas/follower.schema");
const user_schema_1 = require("../schemas/user.schema");
let FollowersService = class FollowersService {
    constructor(userModel, followerModel) {
        this.userModel = userModel;
        this.followerModel = followerModel;
    }
    async followUser(followData) {
        try {
            const newFollow = new this.followerModel({
                follower: followData.followerId,
                following: followData.followingId,
            });
            return newFollow.save();
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException('Failed to follow user');
        }
    }
    async unfollowUser(unfollowData) {
        try {
            const result = await this.followerModel.deleteOne({
                follower: unfollowData.followerId,
                following: unfollowData.followingId,
            });
            if (result.deletedCount === 0) {
                throw new common_1.NotFoundException('No follow relationship found');
            }
            return 'Unfollowed successfully';
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to unfollow user: ${error.message}`);
        }
    }
    async getFollowers(userId) {
        try {
            const followers = await this.followerModel
                .find({
                following: userId,
            })
                .populate({
                path: 'follower',
                select: '_id username fullname bio',
            });
            const users = followers.map((follower) => follower.follower);
            return users;
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to get followers');
        }
    }
    async getFollowing(userId) {
        try {
            const following = await this.followerModel
                .find({
                follower: userId,
            })
                .populate({
                path: 'following',
                select: '_id username fullname bio',
            });
            const users = following.map((followingUser) => followingUser.following);
            return users;
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to get following');
        }
    }
    async isFollowing(followData) {
        try {
            const follow = await this.followerModel.findOne({
                follower: followData.followerId,
                following: followData.followingId,
            });
            return !!follow;
        }
        catch (error) {
            throw new Error(`Failed to check following status: ${error.message}`);
        }
    }
};
exports.FollowersService = FollowersService;
exports.FollowersService = FollowersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(follower_schema_1.Follower.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FollowersService);
//# sourceMappingURL=followers.service.js.map