import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { User } from './user.schema'

@Schema({
    timestamps: true,
})
export class Tweet {
    _id: string

    @Prop({
        required: true,
    })
    content: string

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'User' }],
    })
    author: User

    @Prop({
        default: Date.now,
    })
    tweetedAt: Date

    @Prop({
        default: 0,
    })
    likesCount: number
}

export const TweetSchema = SchemaFactory.createForClass(Tweet)
