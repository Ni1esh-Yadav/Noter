import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user: { userId: string };
}

export const createNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ error: "Content is required" });
      return;
    }

    const note = await prisma.note.create({
      data: { content, userId: req.user!.userId },
    });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

export const getNotes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const updateNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;

   const note = await prisma.note.updateMany({
  where: {
    ...(id ? { id } : {}), 
    userId: req.user!.userId,
  },
  data: { content },
});


    if (note.count === 0) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    res.json({ message: "Note updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const note = await prisma.note.deleteMany({
  where: {
    ...(id !== undefined ? { id } : {}), 
    userId: req.user!.userId,
  },
});


    if (note.count === 0) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};
