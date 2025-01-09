import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Notes from "./Notes";
import AddNote from "./AddNote";

function Home() {
  const context = useContext(NoteContext);
  let { notes, setNotes } = context;
  const [reloadNotes, setReloadNotes] = useState(false);

  return (
    <>
      <div className="container my-5">
        <AddNote></AddNote>
        <Notes reloadNotes={reloadNotes} setReloadNotes={setReloadNotes}></Notes>
      </div>
    </>
  );
}

export default Home;
