import jwt, {} from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env['JWT_SECRET']);
        if (!decoded || !decoded.userId) {
            res.status(401).json({ error: "Invalid token payload" });
            return;
        }
        req.user = { userId: decoded.userId };
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
//# sourceMappingURL=authMiddleware.js.map