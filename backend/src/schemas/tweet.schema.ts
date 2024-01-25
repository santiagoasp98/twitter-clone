import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { User } from './user.schema'

@Schema({
    timestamps: true,
})
export class Tweet {
    @Prop({
        required: true,
    })
    content: string

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'User' }],
    })
    author: User
}

export const TweetSchema = SchemaFactory.createForClass(Tweet)
