import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsPassword } from '../decorators/password.decorator';

export class BaseAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPassword()
    @IsNotEmpty()
    password: string;
}

