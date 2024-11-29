// src/users/interfaces/user.interface.ts
export interface User {
    _id?: string; // _id is typically an ObjectId in MongoDB, but for TypeScript, it’s often represented as a string.
    username: string;
    email: string;
    password: string;
    role: string; // For example, could be 'admin', 'user', etc.
    createdAt: Date;
    updatedAt: Date;
}
