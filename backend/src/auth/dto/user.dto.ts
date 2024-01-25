import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsDate()
    @IsNotEmpty()
    dateOfBirth: Date

    @IsString()
    @IsNotEmpty()
    password: string
}

export class UserLoginDto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    fullname?: string

    @IsDate()
    @IsOptional()
    dateOfBirth?: Date

    @IsString()
    @IsOptional()
    bio?: string

    @IsString()
    @IsOptional()
    profilePicture?: string
}
