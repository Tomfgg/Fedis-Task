import { Injectable, BadRequestException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class MongoIdGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const { id } = request.params;

        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid ID format');
        }
        return true;
    }
}
