import { Module } from '@nestjs/common'
import { FollowersService } from './followers.service'
import { FollowersController } from './followers.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas/user.schema'
import { Follower, FollowerSchema } from 'src/schemas/follower.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([
            { name: Follower.name, schema: FollowerSchema },
        ]),
    ],
    controllers: [FollowersController],
    providers: [FollowersService],
})
export class FollowersModule {}
