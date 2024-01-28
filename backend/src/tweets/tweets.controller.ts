import {
    Body,
    Controller,
    Param,
    Post,
    Get,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { TweetsService } from './tweets.service'
import { CreateTweetDto, UpdateTweetDto } from './dto/tweet.dto'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('tweets')
export class TweetsController {
    constructor(private readonly tweetsService: TweetsService) {}

    @UseGuards(AuthGuard)
    @Post('/create')
    async createTweet(@Body() tweetData: CreateTweetDto) {
        return this.tweetsService.createTweet(tweetData)
    }

    @Get(':username')
    async getAllTweetsByUsername(@Param('username') username: string) {
        return this.tweetsService.getAllTweetsByUsername(username)
    }

    @UseGuards(AuthGuard)
    @Post('/update/:id')
    async updateTweet(
        @Param('id') tweetId: string,
        @Body() tweetData: UpdateTweetDto,
    ) {
        return this.tweetsService.updateTweet(tweetId, tweetData)
    }

    @UseGuards(AuthGuard)
    @Delete('/delete/:id')
    async deleteTweet(@Param('id') tweetId: string) {
        return this.tweetsService.deleteTweet(tweetId)
    }

    @UseGuards(AuthGuard)
    @Post('/like/:id')
    async likeTweet(@Param('id') tweetId: string) {
        return this.tweetsService.likeTweet(tweetId)
    }

    @UseGuards(AuthGuard)
    @Post('/unlike/:id')
    async unlikeTweet(@Param('id') tweetId: string) {
        return this.tweetsService.unlikeTweet(tweetId)
    }
}
