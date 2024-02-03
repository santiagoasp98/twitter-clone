import { FollowersService } from './followers.service';
import { FollowerDto } from './dto/follower.dto';
export declare class FollowersController {
    private readonly followersService;
    constructor(followersService: FollowersService);
    followUser(followData: FollowerDto): Promise<import("../schemas/follower.schema").Follower>;
    unfollowUser(unfollowData: FollowerDto): Promise<string>;
    getFollowers(userId: string): Promise<import("../schemas/user.schema").User[]>;
    getFollowing(userId: string): Promise<import("../schemas/user.schema").User[]>;
    isFollowing(followData: FollowerDto): Promise<boolean>;
}
