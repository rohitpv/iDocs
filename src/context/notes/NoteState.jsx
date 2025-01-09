import { useState } from "react";
import NoteContext from "./NoteContext";
import { useContext } from "react";
import AlertContext from "../alert/AlertContext";
const NoteState = (props) => {
  const host = "https://idocs.onrender.com";
  const notesInitial = [];
  let alert = useContext(AlertContext);
  let { showAlert } = alert;
  const [notes, setNotes] = useState(notesInitial);
  const [currNote, setCurrNote] = useState({});
    // Generate shareable URL
    const generateShareableURL = (id) => {
      return `/share/${id}`;
    };

  //fetch note by id / VIEW NOTE

  const getNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/fetchnote/${id.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Auth-Token":
            localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setCurrNote(json);
      return json;
    } catch (error) {
      console.log("an error has occured in the view a note (getNote) procedure");
    }
  };

  //fetch all notes

  const getAllNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Auth-Token":
            localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.log("an error has occured in the fetch all notes procedure");
    }
  };


  // Add a note
  const addNote = async (title, description, tags) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const json = await response.json();
    showAlert("Note was added successfully", "success");
    console.log(json);
    setNotes(notes.concat(json));
    props.setReloadNotes(true);
  };
  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token":
          localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    showAlert("Note was deleted successfully", "success");
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id != id;
    });

    setNotes(newNotes);
    props.setReloadNotes(true);
  };
  // Edit a note

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Auth-Token":
            localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      showAlert("Note was edited successfully", "success");

      console.log(json);
      let newNotes = JSON.parse(JSON.stringify(notes));
      setNotes(newNotes);
      props.setReloadNotes(true);
    } catch (error) {
      console.log(error);
    }
  };
  // View a note

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, getAllNotes, editNote, generateShareableURL, getNote, currNote, setCurrNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
