import { Request } from 'express';
import { User } from 'src/users/schemas/user.schema';

export interface RequestWithUser extends Request {
    user: User;
}
