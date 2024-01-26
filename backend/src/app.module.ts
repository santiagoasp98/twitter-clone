import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { FollowersModule } from './followers/followers.module';
import * as dotenv from 'dotenv'

dotenv.config({ path: './.env' })

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGODB_URI), AuthModule, FollowersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
