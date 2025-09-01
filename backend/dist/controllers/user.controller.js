import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { id: true, name: true, email: true, dob: true, createdAt: true },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
};
//# sourceMappingURL=user.controller.js.map