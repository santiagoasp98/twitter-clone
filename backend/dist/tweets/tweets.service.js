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
exports.TweetsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const tweet_schema_1 = require("../schemas/tweet.schema");
const follower_schema_1 = require("../schemas/follower.schema");
let TweetsService = class TweetsService {
    constructor(tweetModel, userModel, followerModel) {
        this.tweetModel = tweetModel;
        this.userModel = userModel;
        this.followerModel = followerModel;
    }
    async createTweet(tweetData) {
        try {
            const newTweet = new this.tweetModel({
                content: tweetData.content,
                author: tweetData.author,
            });
            await newTweet.save();
            return { message: 'Tweet successfully created' };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Could not create the tweet');
        }
    }
    async getTweetsFromUser(userId) {
        try {
            const userTweets = await this.tweetModel
                .find({ author: userId })
                .populate({
                path: 'author',
                select: '_id username fullname',
            });
            userTweets.sort((t1, t2) => t2.tweetedAt.getTime() - t1.tweetedAt.getTime());
            return userTweets;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('An error occurred getting the tweets');
        }
    }
    async updateTweet(tweetId, tweetData) {
        try {
            const updatedTweet = await this.tweetModel.findByIdAndUpdate(tweetId, tweetData, { new: true });
            if (!updatedTweet) {
                throw new common_1.NotFoundException('Could not find the tweet');
            }
            return 'Tweet updated successfully';
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('An error occurred updating the tweet');
        }
    }
    async deleteTweet(tweetId) {
        const tweet = await this.tweetModel.findById(tweetId);
        if (!tweet) {
            throw new common_1.NotFoundException('Tweet not found');
        }
        await this.tweetModel.deleteOne({ _id: tweetId });
        return { message: 'Tweet deleted successfully' };
    }
    async likeTweet(tweetId, userId) {
        try {
            const tweetFound = await this.tweetModel
                .findById(tweetId)
                .populate({
                path: 'author',
                select: '_id username fullname',
            });
            if (!tweetFound) {
                throw new common_1.NotFoundException('Could not find the tweet');
            }
            if (tweetFound.likes.includes(userId)) {
                throw new common_1.ConflictException('This user already liked the tweet');
            }
            tweetFound.likes.push(userId);
            const savedTweet = await tweetFound.save();
            return savedTweet;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('An error occurred liking the tweet');
        }
    }
    async unlikeTweet(tweetId, userId) {
        try {
            const tweetFound = await this.tweetModel
                .findById(tweetId)
                .populate({
                path: 'author',
                select: '_id username fullname',
            });
            if (!tweetFound) {
                throw new common_1.NotFoundException('Could not find the tweet');
            }
            if (!tweetFound.likes.includes(userId)) {
                throw new common_1.ConflictException('The user has not liked the tweet');
            }
            tweetFound.likes = tweetFound.likes.filter((id) => id !== userId);
            const savedTweet = await tweetFound.save();
            return savedTweet;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('An error occurred unliking the tweet');
        }
    }
    async getFeedForUser(userId) {
        const following = await this.followerModel.find({
            follower: userId,
        });
        const followingIds = following.map((userFollowing) => userFollowing.following);
        const tweets = await this.tweetModel
            .find({
            author: { $in: followingIds },
        })
            .populate({
            path: 'author',
            select: '_id username fullname',
        });
        tweets.sort((t1, t2) => t2.tweetedAt.getTime() - t1.tweetedAt.getTime());
        return tweets;
    }
};
exports.TweetsService = TweetsService;
exports.TweetsService = TweetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tweet_schema_1.Tweet.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(follower_schema_1.Follower.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TweetsService);
//# sourceMappingURL=tweets.service.js.map