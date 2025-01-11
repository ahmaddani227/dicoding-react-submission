import { useContext } from "react";
import CardLayout from "../components/Layouts/CardLayout";
import CardNote from "../components/Fragments/CardNote";
import SectionLayout from "../components/Layouts/SectionLayout";

const NotesSection = ({ notesAll, notesArchive, setNotes }) => {
  const toggleArchive = (id) => {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id === id) {
          return { ...note, archived: !note.archived };
        }
        return note;
      })
    );
  };

  const deleteNote = (id) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  };

  return (
    <>
      <SectionLayout title="Note Aktif">
        <CardLayout>
          {notesAll.length > 0 ? (
            notesAll.map((note, index) => (
              <CardNote key={index}>
                <div>
                  <CardNote.Header title={note.title} time={note.createdAt} />
                  <CardNote.Body>{note.body}</CardNote.Body>
                </div>
                <CardNote.Footer
                  archived={note.archived}
                  deleteNote={() => deleteNote(note.id)}
                  toggleArchive={() => toggleArchive(note.id)}
                />
              </CardNote>
            ))
          ) : (
            <h1 className="text-xl font-semibold text-red-500">
              Tidak ada catatan
            </h1>
          )}
        </CardLayout>
      </SectionLayout>

      <SectionLayout title="Arsip">
        <CardLayout>
          {notesArchive.length > 0 ? (
            notesArchive.map((note, index) => (
              <CardNote key={index}>
                <div>
                  <CardNote.Header title={note.title} time={note.createdAt} />
                  <CardNote.Body>{note.body}</CardNote.Body>
                </div>
                <CardNote.Footer
                  archived={note.archived}
                  toggleArchive={() => toggleArchive(note.id)}
                  deleteNote={() => deleteNote(note.id)}
                />
              </CardNote>
            ))
          ) : (
            <h1 className="text-xl font-semibold text-red-500">
              Tidak ada catatan yang diarsipkan
            </h1>
          )}
        </CardLayout>
      </SectionLayout>
    </>
  );
};

export default NotesSection;
