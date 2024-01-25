export interface User {
  id: string
  username: string
  fullname: string
  bio: string
  dateOfBirth: string
  joinedAt: Date
  followersCount: number
  followingCount: number
}

export interface CreateUserDto {
  username: string
  email: string
  fullname: string
  dateOfBirth: Date
  password: string
}

export interface UserLoginDto {
  email: string
  password: string
}

export interface UserUpdateDto {
  fullname?: string
  dateOfBirth?: Date
  bio?: string
  profilePicture?: string
}
