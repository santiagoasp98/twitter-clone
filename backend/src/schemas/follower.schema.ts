import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { User } from './user.schema'

@Schema({
    timestamps: true,
})
export class Follower {
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    follower: User

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    following: User
}

export const FollowerSchema = SchemaFactory.createForClass(Follower)
