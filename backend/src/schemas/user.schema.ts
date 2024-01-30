import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    timestamps: true,
})
export class User {
    _id: string

    @Prop({
        unique: true,
        required: true,
        trim: true,
    })
    username: string

    @Prop({
        unique: true,
        required: true,
        trim: true,
    })
    email: string

    @Prop({
        trim: true,
    })
    fullname: string

    @Prop({
        required: true,
    })
    dateOfBirth: Date

    @Prop({
        required: true,
        trim: true,
    })
    password: string

    @Prop({
        trim: true,
    })
    bio: string

    @Prop()
    profilePicture: string

    createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
