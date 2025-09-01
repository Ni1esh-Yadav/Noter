import type { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user: {
        userId: string;
    };
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map