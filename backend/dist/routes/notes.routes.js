import { Router } from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/notes.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);
export default router;
//# sourceMappingURL=notes.routes.js.map