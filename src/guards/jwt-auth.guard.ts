import { HttpException, Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split(' ')[1];

        try {
            const jwtSecret = this.configService.get<string>('JWT_SECRET')
            const decoded = await this.jwtService.verify(token, { secret: jwtSecret });
            const user = await this.usersService.findById(decoded.id);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            request.user = user;
            return true;
        } catch (error) {
            if (!(error instanceof HttpException)) {
                throw new UnauthorizedException('Invalid or expired token');
            }
        }
    }
}
