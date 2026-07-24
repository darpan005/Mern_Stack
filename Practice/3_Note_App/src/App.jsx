import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [notes, setNotes] = useState(() => {
    const savednote = localStorage.getItem("notes");
    return savednote ? JSON.parse(savednote) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  } );

  const addNote = () => {
    if (title.trim() === "" || content.trim === "") {
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
    <div className="outer-div">
      <h1 className="title">Note App</h1>

      <div className="input-div">
        <input
        className="input-title"
          type="text"
          placeholder="Enter Your Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
        className="input-content"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button className="add-btn" onClick={addNote}>Add Note</button>
      </div>

      <div className="return-div">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <h2 className="h2">{note.title}</h2>
            <p className="p">{note.content}</p>

            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
