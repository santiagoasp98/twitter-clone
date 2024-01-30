import { Module } from '@nestjs/common'
import { TweetsService } from './tweets.service'
import { TweetsController } from './tweets.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas/user.schema'
import { Tweet, TweetSchema } from 'src/schemas/tweet.schema'
import { Follower, FollowerSchema } from 'src/schemas/follower.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
        MongooseModule.forFeature([
            { name: Follower.name, schema: FollowerSchema },
        ]),
    ],
    controllers: [TweetsController],
    providers: [TweetsService],
})
export class TweetsModule {}
