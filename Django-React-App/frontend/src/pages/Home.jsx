import React, { useEffect, useState } from "react";
import "../style/Home.css";
import api from "../api";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState(null); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api.get("api/notes/")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
        navigate('/login'); // Redirect to login page on error
      });
  };

  const deleteNote = (id) => {
    api.delete(`api/note/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted");
          getNotes(); // Refresh notes after deletion
        } else {
          alert("Failed to delete note");
        }
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
      });
  };

  const updateNote = (id) => {
    const noteToUpdate = notes.find((note) => note.id === id);
    if (noteToUpdate) {
      setId(noteToUpdate.id); // Set id state for update
      setTitle(noteToUpdate.title);
      setContent(noteToUpdate.content);
    } else {
      console.error(`Note with id ${id} not found.`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      // If id doesn't exist, we are creating a new note
      const newNote = {
        title: title,
        content: content,
      };

      api.post("/api/notes/", newNote)
        .then((res) => {
          if (res.status === 201) {
            alert("Note created successfully");
            getNotes(); // refresh notes after creation
            setTitle(""); // clear input fields after successful submission
            setContent("");
          } else {
            alert("Failed to create note");
          }
        })
        .catch((err) => {
          console.error("Error creating note:", err);
        });
    } else {
      // if id exists, we are updating an existing note
      const updatedNote = {
        title: title,
        content: content,
      };

      api.put(`api/note/update/${id}/`, updatedNote)
        .then((res) => {
          if (res.status === 200) {
            alert("Note updated successfully");
            getNotes(); // refresh notes after update
            setId(null); // reset id state to null to toggle back to create mode
            setTitle(""); 
            setContent("");
          } else {
            alert("Failed to update note");
          }
        })
        .catch((err) => {
          console.error("Error updating note:", err);
        });
    }
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        ))}
      </div>
      <h2>{id ? "Update Note" : "Create a Note"}</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value={id ? "Update" : "Create"} />
      </form>
    </div>
  );
};

export default Home;
