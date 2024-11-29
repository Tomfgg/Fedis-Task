import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';


@Injectable()
export class AdminGuard implements CanActivate {
    constructor() { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user.role === 'Admin' ? true : false
    }
}
