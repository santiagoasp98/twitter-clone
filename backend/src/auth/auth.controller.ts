import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Res,
    Headers,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { CreateUserDto, UpdateUserDto, UserLoginDto } from './dto/user.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
        return this.authService.getUserByUsername(username)
    }

    @Get()
    async getUsers() {
        return this.authService.getUsers()
    }

    @Post('/register')
    async register(
        @Body() userData: CreateUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.register(userData, res)
    }

    @Post('/login')
    async login(
        @Body() userData: UserLoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.login(userData, res)
    }

    @UseGuards(AuthGuard)
    @Post('/logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res)
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
        return this.authService.updateUser(id, userData)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string, res: Response) {
        return this.authService.deleteUser(id, res)
    }

    @Post('/verify')
    async verifyToken(@Headers('authorization') authHeader: string) {
        const token = authHeader.split(' ')[1]
        return this.authService.verifyToken(token)
    }
}
