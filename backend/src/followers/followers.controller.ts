import { Body, Controller, Param, Post, Get, UseGuards } from '@nestjs/common'
import { FollowersService } from './followers.service'
import { FollowerDto } from './dto/follower.dto'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('followers')
export class FollowersController {
    constructor(private readonly followersService: FollowersService) {}

    @UseGuards(AuthGuard)
    @Post('/follow')
    async followUser(@Body() followData: FollowerDto) {
        return this.followersService.followUser(followData)
    }

    @UseGuards(AuthGuard)
    @Post('/unfollow')
    async unfollowUser(@Body() unfollowData: FollowerDto) {
        return this.followersService.unfollowUser(unfollowData)
    }

    @UseGuards(AuthGuard)
    @Get('/:userId/followers')
    async getFollowers(@Param('userId') userId: string) {
        return this.followersService.getFollowers(userId)
    }

    @UseGuards(AuthGuard)
    @Get('/:userId/following')
    async getFollowing(@Param('userId') userId: string) {
        return this.followersService.getFollowing(userId)
    }

    @Post('/isFollowing')
    async isFollowing(@Body() followData: FollowerDto) {
        return this.followersService.isFollowing(followData)
    }
}
