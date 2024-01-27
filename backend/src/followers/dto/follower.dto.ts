import { IsNotEmpty, IsString } from 'class-validator'

export class FollowerDto {
    @IsNotEmpty()
    @IsString()
    followerId: string

    @IsNotEmpty()
    @IsString()
    followingId: string
}
