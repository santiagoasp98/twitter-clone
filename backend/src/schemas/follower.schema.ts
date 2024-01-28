import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema({
    timestamps: true,
})
export class Follower {
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    follower: string

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    following: string
}

export const FollowerSchema = SchemaFactory.createForClass(Follower)
