import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas/user.schema'
import { Follower, FollowerSchema } from 'src/schemas/follower.schema'

const TOKEN_SECRET = process.env.TOKEN_SECRET

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([
            { name: Follower.name, schema: FollowerSchema },
        ]),
        JwtModule.register({
            global: true,
            secret: `${TOKEN_SECRET}`,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
