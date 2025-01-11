import React from "react";
import { useEffect, useState } from "react";
import { getInitialData } from "../utils";
import Toolbar from "../Modules/Toolbar";
import NotesSection from "../Modules/NotesSection";
import ModalAdd from "../Modules/ModalAdd";

export default function BodyApp() {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [searchNotes, setSearchNotes] = useState([]);
  const [notes, setNotes] = useState(getInitialData());

  const notesAll = (searchNotes || notes).filter((note) => !note.archived);
  const notesArchive = (searchNotes || notes).filter((note) => note.archived);

  useEffect(() => {
    setSearchNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);
  return (
    <main>
      <Toolbar onOpen={() => setOpen(true)} setQuery={setQuery} />
      <NotesSection
        notesAll={notesAll}
        notesArchive={notesArchive}
        setNotes={setNotes}
      />
      <ModalAdd
        open={open}
        onClose={() => setOpen(false)}
        setNotes={setNotes}
      />
    </main>
  );
}
