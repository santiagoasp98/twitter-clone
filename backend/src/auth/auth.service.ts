import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import { User } from 'src/schemas/user.schema'
import { CreateUserDto, UpdateUserDto, UserLoginDto } from './dto/user.dto'
import { Response } from 'express'
import { compare, hash } from 'bcryptjs'
import { Follower } from 'src/schemas/follower.schema'

export interface ReturnUser {
    id: string
    username: string
    fullname: string
    bio: string
    dateOfBirth: Date
    joinedAt: Date
    followersCount: number
    followingCount: number
}

const ERROR_CODE_PASSWORD_ENCRYPTION = 'P.E.'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Follower.name) private followerModel: Model<Follower>,
        private jwtService: JwtService,
    ) {}

    // Fetch a user by username and return a ReturnUser object
    async getUserByUsername(username: string) {
        const user = await this.userModel.findOne({ username: username })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return this.createReturnUser(user)
    }

    // Fetch users that the excluded user is not following and return as ReturnUser objects
    async getUsers(excludedUserId: string): Promise<ReturnUser[]> {
        // Get the IDs of the users that the excluded user is following
        const following: Follower[] = await this.followerModel.find({
            follower: excludedUserId,
        })
        const followingIds = following.map(
            (userFollowing) => userFollowing.following,
        )

        // Find users that the excluded user is not following
        const usersNotFollowed = await this.userModel
            .find({ _id: { $nin: [...followingIds, excludedUserId] } })
            .limit(3)

        // Map User objects to ReturnUser objects using createReturnUser
        const returnUsers: Promise<ReturnUser>[] = usersNotFollowed.map(
            (user) => this.createReturnUser(user),
        )

        // Wait for all promises to resolve
        const resolvedReturnUsers: ReturnUser[] = await Promise.all(returnUsers)

        return resolvedReturnUsers
    }

    // Register a new user
    async register(userData: CreateUserDto, res: Response) {
        const userFound = await this.findUser(userData)

        if (userFound) {
            this.handleUserConflict(userFound, userData)
        }

        const encryptedPassword = await this.encryptPassword(userData.password)
        const savedUser = await this.createNewUser(userData, encryptedPassword)

        return this.generateTokenAndSetCookie(savedUser, res)
    }

    // Login a user and return a token
    async login(
        userData: UserLoginDto,
        res: Response,
    ): Promise<{ user: ReturnUser; access_token: string }> {
        const userFound = await this.findUserByEmail(userData.email)
        if (
            !userFound ||
            !(await this.isPasswordMatch(userData.password, userFound.password))
        ) {
            throw new NotFoundException('Invalid credentials')
        }

        return this.generateTokenAndSetCookie(userFound, res)
    }

    // Logout a user by clearing the access_token cookie
    async logout(res: Response) {
        res.clearCookie('access_token')
        res.status(200).json({ message: 'Logged out' })
    }

    async updateUser(id: string, userData: UpdateUserDto) {
        let updatedUser: User | null
        try {
            updatedUser = await this.userModel.findByIdAndUpdate(id, userData, {
                new: true,
            })
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Update failed')
        }

        if (!updatedUser) {
            throw new NotFoundException('User not found')
        }

        return this.createReturnUser(updatedUser)
    }

    async deleteUser(id: string, res: Response) {
        let deletedUser: User | null
        try {
            deletedUser = await this.userModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Delete failed')
        }

        if (!deletedUser) {
            throw new NotFoundException('User not found')
        }

        res.status(200).json({ message: 'User deleted' })
    }

    // Verify a token and return its payload
    async verifyToken(token: string) {
        try {
            const payload = this.jwtService.verify(token)
            return {
                user: payload.user,
                access_token: token,
            }
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Invalid token')
        }
    }

    /**
     * Utility functions:
     */

    private async generateTokenAndSetCookie(
        user: User,
        res: Response,
    ): Promise<{ user: ReturnUser; access_token: string }> {
        const returnUser = await this.createReturnUser(user)
        const payload = { user: returnUser }
        const access_token = await this.jwtService.signAsync(payload)

        this.setCookie(res, access_token)

        return {
            user: returnUser,
            access_token: access_token,
        }
    }

    private async passwordEncrypter(pass: string) {
        const passwordHash = await hash(pass, 10)
        return passwordHash
    }

    private async createReturnUser(user: User): Promise<ReturnUser> {
        const followersCount = await this.followerModel.countDocuments({
            following: user._id.toString(),
        })
        const followingCount = await this.followerModel.countDocuments({
            follower: user._id.toString(),
        })

        return {
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            bio: user.bio,
            dateOfBirth: user.dateOfBirth,
            joinedAt: user.createdAt,
            followersCount: followersCount,
            followingCount: followingCount,
        }
    }

    private async findUser(userData: CreateUserDto) {
        return this.userModel.findOne({
            $or: [{ username: userData.username }, { email: userData.email }],
        })
    }

    private handleUserConflict(userFound: User, userData: CreateUserDto) {
        if (userFound.username === userData.username) {
            throw new ConflictException('Username is already in use')
        } else if (userFound.email === userData.email) {
            throw new ConflictException('Email is already in use')
        }
    }

    private async encryptPassword(password: string): Promise<string> {
        try {
            return await this.passwordEncrypter(password)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                `Something went wrong. Code: ${ERROR_CODE_PASSWORD_ENCRYPTION}`,
            )
        }
    }

    private async createNewUser(
        userData: CreateUserDto,
        encryptedPassword: string,
    ) {
        const newUser = new this.userModel({
            username: userData.username,
            email: userData.email,
            fullname: userData.fullname,
            dateOfBirth: userData.dateOfBirth,
            password: encryptedPassword,
        })

        return newUser.save()
    }

    private setCookie(res: Response, token: string) {
        res.cookie('access_token', token)
    }

    private async findUserByEmail(email: string) {
        return this.userModel.findOne({ email: email })
    }

    private async isPasswordMatch(
        inputPassword: string,
        storedPassword: string,
    ): Promise<boolean> {
        return compare(inputPassword, storedPassword)
    }
}
