import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import * as dotenv from 'dotenv'

dotenv.config({ path: './.env' })

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGODB_URI), AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
