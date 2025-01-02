import React from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";
const About = () => {
  const props = useContext(NoteContext);
  return (
    <>
      <div className="container">
        <h1 className="my-3">
          <strong>About</strong>
        </h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <strong>About me</strong>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Hello! My name is P Venkata Rohit, and I'm a Full-Stack Developer with 3.5 years of experience in building robust web applications. Proficient in HTML, CSS, JavaScript,
React, and Node.js. Proven track record of enhancing user experience and driving software performance by up to 30%.
Seeking to leverage expertise in Web development, API integration, and cloud technologies to contribute to innovative
and high-impact projects in a growth-oriented tech environment..
              </div>
            </div>
             
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <strong>Cloud Docs App</strong>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                iDocs is a cloud-based documents collaboration app built with the MERN
                stack (MongoDB, Express, React, Node.js). Users can create,
                store, and manage their documents effortlessly.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <strong>Features</strong>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                With this app, you can securely log in, organize your text files easily,
                and enjoy a user-friendly interface. Access documents from anywhere,
                boosting productivity and staying organized. iDocs leverages
                modern web technologies for a smooth and versatile document experience.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
