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
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateTweetDto, UpdateTweetDto } from './dto/tweet.dto';
import { Tweet } from 'src/schemas/tweet.schema';
import { Follower } from 'src/schemas/follower.schema';
export declare class TweetsService {
    private tweetModel;
    private userModel;
    private followerModel;
    constructor(tweetModel: Model<Tweet>, userModel: Model<User>, followerModel: Model<Follower>);
    createTweet(tweetData: CreateTweetDto): Promise<{
        message: string;
    }>;
    getTweetsFromUser(userId: string): Promise<Omit<import("mongoose").Document<unknown, {}, Tweet> & Tweet & Required<{
        _id: string;
    }>, never>[]>;
    updateTweet(tweetId: string, tweetData: UpdateTweetDto): Promise<string>;
    deleteTweet(tweetId: string): Promise<{
        message: string;
    }>;
    likeTweet(tweetId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Tweet> & Tweet & Required<{
        _id: string;
    }>>;
    unlikeTweet(tweetId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Tweet> & Tweet & Required<{
        _id: string;
    }>>;
    getFeedForUser(userId: string): Promise<Tweet[]>;
}
