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
import { useEffect, useState } from "react";
import ModalAdd from "../Components/ModalAdd";
import { useSearchParams } from "react-router-dom";

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
};

const HomePage = () => {
  const { notes, setNotes, setArchivedNotes } = useNotes();

  const handleDelete = (id: string) => {
    deleteNote(id);
    setNotes(getActiveNotes());
  };

  const handleArchive = (id: string) => {
    archiveNote(id);
    setNotes(getActiveNotes());
    setArchivedNotes(getArchivedNotes());
  };

  const allNotes: Note[] = getAllNotes();

  const [open, setOpen] = useState<boolean>(false);

  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  useEffect(() => {
    if (query) {
      const filtered = allNotes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [query, notes, allNotes]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchParams(value ? { search: value } : {});
  };

  return (
    <AppLayout>
      <section className="min-h-[calc(100vh-120px)] py-8">
        <div className="container">
          <div className="flex justify-between">
            <button
              onClick={() => setOpen(true)}
              className="px-2.5 py-1.5 text-base font-normal text-white bg-blue-500 rounded-lg"
            >
              Create Note
            </button>

            <form>
              <input
                onChange={handleSearch}
                type="text"
                name="search"
                id="search"
                className="py-1.5 px-2.5 border-slate-200 rounded-lg w-full border outline-none focus:border-blue-500 text-sm min-w-[400px] inline-block transition-all"
                placeholder="Search..."
              />
            </form>
          </div>
          <h1 className="mt-5 mb-4 text-2xl font-semibold">Notes List</h1>

          {filteredNotes.length > 0 ? (
            <div className="grid w-full grid-cols-3 gap-6">
              {filteredNotes.map((note: any) => (
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

      <ModalAdd open={open} onClose={() => setOpen(false)} />
    </AppLayout>
  );
};

export default HomePage;
