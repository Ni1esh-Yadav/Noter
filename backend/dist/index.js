import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
app.use("/user", userRoutes);
const PORT = process.env['PORT'] || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map