import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import RichTextInput from "./RichTextInput";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

function CollaborateNote(id) {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tags: "General",
  });

  const context = useContext(NoteContext);
  let { currNote, getNote, editNote } = context;
  console.log("in collaboratenote jsx id=", id);


  useEffect(() => {
    const fetchNote = async () => {
      let currRETNote = await getNote(id);
      setNote({
        title: currRETNote.title,
        description: currRETNote.description,
        tags: currRETNote.tags,
        isShared: true,
      });
    };
    fetchNote();

    // change based on other person's input but will run tracking id -TODO check later
    socket.on("noteChange", (updatedNote) => {
      console.log("SOCKET IO: noteChange********************", updatedNote);
      if (updatedNote.id === id.id) {
        setNote(updatedNote);
      }
    });

    return () => {
      socket.off("noteChange");
    };
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    editNote(id.id, note.title, note.description, note.tags);
    console.log("clicked update note", id.id, note.title, note.description, note.tags);
  };

  const userInitiated = useRef(false);

  const onChange = (e) => {
    userInitiated.current = true;
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log("in onChange e.target=",e.target.name,e.target.value)
    console.log("in onChange newww=", { ...id, ...note });

  };
  useEffect(() => {
    if (userInitiated.current) {
      socket.emit("noteChange", { ...id, ...note });
      userInitiated.current = false;
    }
  }, [note]);
  return (
    <>
      <div className="container my-5">
        <h1>Collaborate and share notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              name="title"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
            />
            <div id="emailHelp" className="form-text">
              Minimum 5 characters
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            
<RichTextInput value={note.description} onChange={onChange} />
            <div id="emailHelp" className="form-text">
              Minimum 5 characters
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              value={note.tags}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Update Note
          </button>
        </form>
      </div>
    </>
  );
}

export default CollaborateNote;
