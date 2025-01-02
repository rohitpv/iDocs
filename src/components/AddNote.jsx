import React from "react";
import { useContext } from "react";
import { useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import RichTextInput from "./RichTextInput";
function AddNote() {
  const context = useContext(NoteContext);
  let { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tags: "General",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tags);
    setNote({
      title: "",
      description: "",
      tags: "General",
    });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-5">
        <h1>Add your notes</h1>
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
            {/* <textarea 
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            /> */}
            {/* ************************************** */}
            {/* <div style="
        max-width: 800px;
        margin: 20px auto;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
    >
        <div style="
            padding: 10px;
            border-bottom: 1px solid #eee;
            background: #f8f9fa;
            display: flex;
            gap: 10px;
            border-radius: 4px 4px 0 0;"
        >
            <button 
                onclick="execCommand('bold')"
                style="
                    padding: 5px 10px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    cursor: pointer;"
                onmouseover="this.style.background='#f0f0f0'"
                onmouseout="this.style.background='white'"
            ><b>B</b></button>
            
            <button 
                onclick="execCommand('italic')"
                style="
                    padding: 5px 10px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    cursor: pointer;"
                onmouseover="this.style.background='#f0f0f0'"
                onmouseout="this.style.background='white'"
            ><i>I</i></button>
            
            <button 
                onclick="execCommand('underline')"
                style="
                    padding: 5px 10px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    cursor: pointer;"
                onmouseover="this.style.background='#f0f0f0'"
                onmouseout="this.style.background='white'"
            ><u>U</u></button>
            
            <button 
                onclick="execCommand('insertUnorderedList')"
                style="
                    padding: 5px 10px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    cursor: pointer;"
                onmouseover="this.style.background='#f0f0f0'"
                onmouseout="this.style.background='white'"
            >• List</button>
            
            <button 
                onclick="execCommand('insertOrderedList')"
                style="
                    padding: 5px 10px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    cursor: pointer;"
                onmouseover="this.style.background='#f0f0f0'"
                onmouseout="this.style.background='white'"
            >1. List</button>
        </div>
        
        <div 
            id="editor"
            contenteditable="true"
            style="
                min-height: 300px;
                padding: 20px;
                outline: none;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;"
            onpaste="handlePaste(event)"
            onkeydown="handleKeyDown(event)"
            onfocus="this.style.background='#fafafa'"
            onblur="this.style.background='white'"
        ></div>
            </div> */}
<RichTextInput value={note.description} onChange={onChange} />
    {/* ************************************** */}
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
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
