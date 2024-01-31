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

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    author: User

    @Prop({
        default: Date.now,
    })
    tweetedAt: Date

    @Prop({
        type: [String],
        default: [],
    })
    likes: string[]
}

export const TweetSchema = SchemaFactory.createForClass(Tweet)
