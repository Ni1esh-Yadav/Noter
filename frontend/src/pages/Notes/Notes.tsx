import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getNotes, createNote, deleteNote } from "../../services/notesService";
import logo1 from "../../assets/logo1.svg";
import remove from "../../assets/delete.svg";

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
  const [showInput, setShowInput] = useState(false);

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
      setShowInput(false);
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
        <div className="flex gap-4">
          <img src={logo1} alt="logo"></img>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </div>

        <button onClick={handleLogout} className="text-custom-blue underline">
          Sign Out
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 mb-6 text-center">
        <h2 className="text-xl sm:text-lg font-bold text-gray-800">
          Welcome, {auth?.user?.name || "User"} !
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Email: {auth?.user?.email || "xxxxx@xxxx.com"}
        </p>
      </div>
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="w-full max-w-2xl py-3 mb-6 bg-custom-blue text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Create Note
        </button>
      ) : (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-4 mb-6">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-blue mb-3"
            rows={3}
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowInput(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="px-4 py-2 bg-custom-blue text-white rounded-lg shadow hover:bg-blue-700 transition "
            >
              Save
            </button>
          </div>
        </div>
      )}
      {notes.length > 0 ? (
        <h1 className="w-full max-w-2xl text-left text-xl font-medium text-gray-800 mb-4">
          Notes
        </h1>
      ) : (
        <h1>No Notes Availabe Click on Create Notes to add some notes</h1>
      )}

      <div className="w-full max-w-2xl space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <span className="text-gray-700">{note.content}</span>
            <button
              onClick={() => handleDelete(note.id)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <img src={remove} alt="delete icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
