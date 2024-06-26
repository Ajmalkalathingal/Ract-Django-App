import { useEffect, useState } from "react";
import "../style/Home.css"
import api from "../api";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [notes, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNote();
  }, []);

  const getNote = () => {
    api
      .get("api/notes/")
      .then((res)=> res.data)
      .then((data)=>{
        setNote(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
        navigate('/login')
      });
  };

  const deleteNote = (id) => {
    api
      .delete(`api/note/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("note deleted");
          getNote()
        } else {
          ("failed to delete note");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createNote = (e) => {
    e.preventDefault();
    api
        .post("/api/notes/", { content, title })
        .then((res) => {
            if (res.status === 201) {
              alert("Note created!")
            }
            else alert("Failed to make note.");
            getNote()
        })
        .catch((err) => alert(err));
};
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
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
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Home;
