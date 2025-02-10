import Card from "../Components/Card";
import AppLayout from "../Components/Layouts/AppLayout";
import { useNotes } from "../context/Notes";
import {
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  unarchiveNote,
} from "../utils";

const ArchivedPage = () => {
  const { archivedNotes, setArchivedNotes, setNotes } = useNotes();

  const handleUnarchive = (id: string) => {
    unarchiveNote(id);
    setNotes(getActiveNotes());
    setArchivedNotes(getArchivedNotes());
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    setArchivedNotes(getArchivedNotes());
  };

  return (
    <AppLayout>
      <section className="min-h-[calc(100vh-120px)]">
        <div className="container">
          <h1 className="mt-5 mb-4 text-2xl font-semibold">Archive Notes</h1>

          {archivedNotes.length > 0 ? (
            <div className="grid w-full grid-cols-3 gap-6">
              {archivedNotes.map((note: any) => (
                <Card
                  key={note.id}
                  data={note}
                  deleteNote={() => handleDelete(note.id)}
                  action={() => handleUnarchive(note.id)}
                />
              ))}
            </div>
          ) : (
            <h1>Data Arsip tidak ada</h1>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default ArchivedPage;
