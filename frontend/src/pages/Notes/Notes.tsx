import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getNotes, createNote, deleteNote } from "../../services/notesService";

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

const Notes: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        console.error("Failed to load notes", err);
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const note = await createNote(newNote);
      setNotes([note, ...notes]);
      setNewNote("");
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const handleLogout = () => {
    auth?.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {auth?.user?.name || auth?.user?.email}
        </h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="w-full max-w-2xl flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-2xl space-y-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
          >
            <div>
              <p className="text-gray-700">{note.content}</p>
              <span className="text-sm text-gray-400">
                {new Date(note.createdAt).toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => handleDelete(note.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
