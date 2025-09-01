import type { Request, Response } from "express";
interface AuthRequest extends Request {
    user: {
        userId: string;
    };
}
export declare const getProfile: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=user.controller.d.ts.map