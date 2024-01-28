import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/schemas/user.schema'
import { CreateTweetDto, UpdateTweetDto } from './dto/tweet.dto'
import { Tweet } from 'src/schemas/tweet.schema'

@Injectable()
export class TweetsService {
    constructor(
        @InjectModel(Tweet.name) private tweetModel: Model<Tweet>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async createTweet(tweetData: CreateTweetDto) {
        try {
            const newTweet = new this.tweetModel({
                content: tweetData.content,
                author: tweetData.author,
            })

            // find the author to add the tweet
            const author = await this.userModel.findById(tweetData.author)
            if (!author) {
                throw new NotFoundException('Author not found')
            }

            const savedTweet = await newTweet.save()
            author.tweets.push(savedTweet)
            await author.save()

            return savedTweet
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Could not create the tweet')
        }
    }

    async getAllTweetsByUsername(username: string) {
        try {
            const userFound = await this.userModel.findOne({
                username: username,
            })
            if (!userFound) {
                throw new NotFoundException('Could not find the user')
            }
            return userFound.tweets
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
            return updatedTweet
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                'An error occurred updating the tweet',
            )
        }
    }

    async deleteTweet(tweetId: string) {
        let deletedTweet: Tweet | null
        try {
            deletedTweet = await this.tweetModel.findByIdAndDelete(tweetId)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Delete failed')
        }

        if (!deletedTweet) {
            throw new NotFoundException('Tweet not found')
        }

        return 'Tweet deleted successfully'
    }

    async likeTweet(tweetId: string) {
        try {
            const tweetFound = await this.tweetModel.findById(tweetId)
            if (!tweetFound) {
                throw new NotFoundException('Could not find the tweet')
            }

            tweetFound.likesCount++
            const savedTweet = await tweetFound.save()

            return savedTweet
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                'An error occurred liking the tweet',
            )
        }
    }

    async unlikeTweet(tweetId: string) {
        try {
            const tweetFound = await this.tweetModel.findById(tweetId)
            if (!tweetFound) {
                throw new NotFoundException('Could not find the tweet')
            }

            if (tweetFound.likesCount > 0) {
                tweetFound.likesCount--
            }
            const savedTweet = await tweetFound.save()

            return savedTweet
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                'An error occurred unliking the tweet',
            )
        }
    }
}
