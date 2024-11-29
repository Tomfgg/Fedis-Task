import { IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { BaseAuthDto } from './base-auth.dto';

export class CreateUserDto extends BaseAuthDto {
    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;
}

