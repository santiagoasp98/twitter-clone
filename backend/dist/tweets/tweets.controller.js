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
exports.TweetsController = void 0;
const common_1 = require("@nestjs/common");
const tweets_service_1 = require("./tweets.service");
const tweet_dto_1 = require("./dto/tweet.dto");
const auth_guard_1 = require("../auth/auth.guard");
let TweetsController = class TweetsController {
    constructor(tweetsService) {
        this.tweetsService = tweetsService;
    }
    async createTweet(tweetData) {
        return this.tweetsService.createTweet(tweetData);
    }
    async getTweetsFromUser(userId) {
        return this.tweetsService.getTweetsFromUser(userId);
    }
    async updateTweet(tweetId, tweetData) {
        return this.tweetsService.updateTweet(tweetId, tweetData);
    }
    async deleteTweet(tweetId) {
        return this.tweetsService.deleteTweet(tweetId);
    }
    async likeTweet(tweetId, data) {
        return this.tweetsService.likeTweet(tweetId, data.userId);
    }
    async unlikeTweet(tweetId, data) {
        return this.tweetsService.unlikeTweet(tweetId, data.userId);
    }
    async getFeedForUser(userId) {
        return this.tweetsService.getFeedForUser(userId);
    }
};
exports.TweetsController = TweetsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tweet_dto_1.CreateTweetDto]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "createTweet", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "getTweetsFromUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tweet_dto_1.UpdateTweetDto]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "updateTweet", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "deleteTweet", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/like/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "likeTweet", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/unlike/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "unlikeTweet", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/feed/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TweetsController.prototype, "getFeedForUser", null);
exports.TweetsController = TweetsController = __decorate([
    (0, common_1.Controller)('tweets'),
    __metadata("design:paramtypes", [tweets_service_1.TweetsService])
], TweetsController);
//# sourceMappingURL=tweets.controller.js.map