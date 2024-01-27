import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Follower } from 'src/schemas/follower.schema'
import { User } from 'src/schemas/user.schema'
import { FollowerDto } from './dto/follower.dto'

@Injectable()
export class FollowersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Follower.name) private followerModel: Model<Follower>,
    ) {}

    async followUser(followData: FollowerDto): Promise<Follower> {
        try {
            const newFollow = new this.followerModel({
                follower: followData.followerId,
                following: followData.followingId,
            })

            return newFollow.save()
        } catch (error) {
            throw new NotFoundException('Failed to follow user')
        }
    }

    async unfollowUser(unfollowData: FollowerDto): Promise<string> {
        try {
            const result = await this.followerModel.deleteOne({
                follower: unfollowData.followerId,
                following: unfollowData.followingId,
            })

            if (result.deletedCount === 0) {
                throw new NotFoundException('No follow relationship found')
            }

            return 'Unfollowed successfully'
        } catch (error) {
            throw new NotFoundException(
                `Failed to unfollow user: ${error.message}`,
            )
        }
    }

    async getFollowers(userId: string): Promise<User[]> {
        try {
            const followers: Follower[] = await this.followerModel.find({
                following: userId,
            })
            const followersIds = followers.map((follower) => follower.follower)
            return this.userModel.find({ _id: { $in: followersIds } })
        } catch (error) {
            throw new NotFoundException('Failed to get followers')
        }
    }

    async getFollowing(userId: string): Promise<User[]> {
        try {
            const following: Follower[] = await this.followerModel.find({
                follower: userId,
            })
            const followingIds = following.map(
                (userFollowing) => userFollowing.following,
            )
            return this.userModel.find({ _id: { $in: followingIds } })
        } catch (error) {
            throw new NotFoundException('Failed to get following')
        }
    }

    async isFollowing(followData: FollowerDto): Promise<boolean> {
        try {
            const follow = await this.followerModel.findOne({
                follower: followData.followerId,
                following: followData.followingId,
            })

            return !!follow
        } catch (error) {
            throw new Error(
                `Failed to check following status: ${error.message}`,
            )
        }
    }
}
