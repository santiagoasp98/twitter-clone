export declare class CreateUserDto {
    username: string;
    email: string;
    fullname: string;
    dateOfBirth: Date;
    password: string;
}
export declare class UserLoginDto {
    email: string;
    password: string;
}
export declare class UpdateUserDto {
    fullname?: string;
    dateOfBirth?: Date;
    bio?: string;
    profilePicture?: string;
}
