import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/schemas/user.schema'
import { CreateTweetDto, UpdateTweetDto } from './dto/tweet.dto'
import { Tweet } from 'src/schemas/tweet.schema'
import { Follower } from 'src/schemas/follower.schema'

@Injectable()
export class TweetsService {
    constructor(
        @InjectModel(Tweet.name) private tweetModel: Model<Tweet>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Follower.name) private followerModel: Model<Follower>,
    ) {}

    async createTweet(tweetData: CreateTweetDto) {
        try {
            const newTweet = new this.tweetModel({
                content: tweetData.content,
                author: tweetData.author,
            })
            await newTweet.save()

            return { message: 'Tweet successfully created' }
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Could not create the tweet')
        }
    }

    async getTweetsFromUser(userId: string) {
        try {
            const userTweets = await this.tweetModel
                .find({ author: userId })
                .populate({
                    path: 'author',
                    select: '_id username fullname',
                })
            userTweets.sort(
                (t1, t2) => t2.tweetedAt.getTime() - t1.tweetedAt.getTime(),
            )

            return userTweets
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                'An error occurred getting the tweets',
            )
        }
    }

    async updateTweet(tweetId: string, tweetData: UpdateTweetDto) {
        try {
            const updatedTweet = await this.tweetModel.findByIdAndUpdate(
                tweetId,
                tweetData,
                { new: true },
            )
            if (!updatedTweet) {
                throw new NotFoundException('Could not find the tweet')
            }

            return 'Tweet updated successfully'
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                'An error occurred updating the tweet',
            )
        }
    }

    async deleteTweet(tweetId: string) {
        const tweet = await this.tweetModel.findById(tweetId)

        if (!tweet) {
            throw new NotFoundException('Tweet not found')
        }

        // Delete the tweet
        await this.tweetModel.deleteOne({ _id: tweetId })

        return { message: 'Tweet deleted successfully' }
    }

    async likeTweet(tweetId: string, userId: string) {
        try {
            const tweetFound = await this.tweetModel
                .findById(tweetId)
                .populate({
                    path: 'author',
                    select: '_id username fullname',
                })
            if (!tweetFound) {
                throw new NotFoundException('Could not find the tweet')
            }

            if (tweetFound.likes.includes(userId)) {
                throw new ConflictException('This user already liked the tweet')
            }
            tweetFound.likes.push(userId)
            const savedTweet = await tweetFound.save()

            return savedTweet
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                'An error occurred liking the tweet',
            )
        }
    }

    async unlikeTweet(tweetId: string, userId: string) {
        try {
            const tweetFound = await this.tweetModel
                .findById(tweetId)
                .populate({
                    path: 'author',
                    select: '_id username fullname',
                })
            if (!tweetFound) {
                throw new NotFoundException('Could not find the tweet')
            }

            if (!tweetFound.likes.includes(userId)) {
                throw new ConflictException('The user has not liked the tweet')
            }

            tweetFound.likes = tweetFound.likes.filter((id) => id !== userId)
            const savedTweet = await tweetFound.save()

            return savedTweet
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                'An error occurred unliking the tweet',
            )
        }
    }

    async getFeedForUser(userId: string): Promise<Tweet[]> {
        const following: Follower[] = await this.followerModel.find({
            follower: userId,
        })
        const followingIds = following.map(
            (userFollowing) => userFollowing.following,
        )

        const tweets = await this.tweetModel
            .find({
                author: { $in: followingIds },
            })
            .populate({
                path: 'author',
                select: '_id username fullname',
            })
        tweets.sort((t1, t2) => t2.tweetedAt.getTime() - t1.tweetedAt.getTime())

        return tweets
    }
}
