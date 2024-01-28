import { Module } from '@nestjs/common'
import { TweetsService } from './tweets.service'
import { TweetsController } from './tweets.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas/user.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [TweetsController],
    providers: [TweetsService],
})
export class TweetsModule {}
