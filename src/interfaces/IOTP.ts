
export interface IOTP {
    otp: string;
    userID: string;
    email: string;
    expiresAt: Date;
    used: boolean;
}