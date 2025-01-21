import Card from "../Components/Card";
import AppLayout from "../Components/Layouts/AppLayout";
import {
  archiveNote,
  deleteNote,
  getActiveNotes,
  getAllNotes,
  getArchivedNotes,
} from "../utils/index";
import { useNotes } from "../context/Notes";

const HomePage = () => {
  const { notes, setNotes, setArchivedNotes } = useNotes();

  console.log(getAllNotes());

  const handleDelete = (id: string) => {
    deleteNote(id);
    setNotes(getActiveNotes());
  };

  const handleArchive = (id: string) => {
    archiveNote(id);
    setNotes(getActiveNotes());
    setArchivedNotes(getArchivedNotes());
  };

  return (
    <AppLayout>
      <section className="min-h-[calc(100vh-120px)] py-8">
        <div className="container">
          <div className="flex justify-between">
            <a
              href="#"
              className="px-2.5 py-1.5 text-base font-normal text-white bg-blue-500 rounded-lg"
            >
              Create Notes
            </a>

            <form>
              <input
                type="text"
                name="search"
                id="search"
                className="py-1.5 px-2.5 border-slate-200 rounded-lg w-full border outline-none focus:border-blue-500 text-sm min-w-[400px] inline-block transition-all"
                placeholder="Search..."
              />
            </form>
          </div>
          <h1 className="mt-5 mb-4 text-2xl font-semibold">Notes List</h1>

          {notes.length > 0 ? (
            <div className="grid w-full grid-cols-3 gap-6">
              {notes.map((note: any) => (
                <Card
                  key={note.id}
                  data={note}
                  deleteNote={() => handleDelete(note.id)}
                  action={() => handleArchive(note.id)}
                />
              ))}
            </div>
          ) : (
            <h1>Data tidak ada</h1>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default HomePage;
