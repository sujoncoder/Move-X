// TYPESCRIPT ENUM
export enum Role {
    SENDER = "SENDER",
    RECEIVER = "RECEIVER",
    ADMIN = "ADMIN"
};


// TYPESCRIPT INTERFACE
export interface IUser {
    name: string;
    email: string;
    phone: string;
    password: string
    role: Role;
    isBlocked?: boolean
};