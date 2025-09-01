import type { Request, Response } from "express";
interface AuthRequest extends Request {
    user: {
        userId: string;
    };
}
export declare const createNote: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getNotes: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateNote: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteNote: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=notes.controller.d.ts.map