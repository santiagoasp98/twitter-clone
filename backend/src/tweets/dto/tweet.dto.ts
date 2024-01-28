import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTweetDto {
    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsString()
    author: string
}

export class UpdateTweetDto {
    @IsNotEmpty()
    @IsString()
    content: string
}
