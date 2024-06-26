import React from "react";
import "../style/Notes.css";

function Note({ note, onDelete, onUpdate }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  const handleUpdate = () => {
    // Call onUpdate function passed from parent component (Home.jsx or wherever it's defined)
    onUpdate(note.id);
  };

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
      <button className="update-button" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
}

export default Note;
