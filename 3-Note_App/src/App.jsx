import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (title.trim() === "" || content.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="app">
      <h1>Notes App</h1>

      <div className="note-form">
        <input
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button onClick={addNote}>Add Note</button>
      </div>

      <div className="notes-container">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <h2>{note.title}</h2>

            <p>{note.content}</p>

            <button onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;