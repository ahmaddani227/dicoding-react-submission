import Card from "../Components/Card";
import AppLayout from "../Components/Layouts/AppLayout";
import { useEffect, useState } from "react";
import ModalAdd from "../Components/ModalAdd";
import { useSearchParams } from "react-router-dom";
import useAuthGuard from "../hooks/useAuthGuard";
import { archiveNote, getActiveNotes, deleteNote } from "../utils/notes";
import useAlert from "../hooks/useAlert";
import { languageStore } from "../store/languageStore";
import { LanguageHome } from "../constant/language";

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
};

const HomePage = () => {
  useAuthGuard(); // protection
  const { showAlert } = useAlert();

  const { language } = languageStore();
  const LANGUAGE = language === "en" ? LanguageHome.en : LanguageHome.id;

  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const handleDelete = async (id: string) => {
    const response: { error: boolean } = await deleteNote(id);

    if (!response.error) {
      showAlert("Success", "Note berhasil di hapus", "success");
    }
  };

  const handleArchive = async (id: string) => {
    const response: { error: boolean; data: any } = await archiveNote(id);
    if (!response.error) {
      showAlert("Success", "Data berhasil di arsipkan!", "success");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response: { error: boolean; data: any } = await getActiveNotes();

      if (!response.error) {
        setAllNotes(response.data);
      }
    }

    fetchData();
  }, [handleArchive, handleDelete]);

  useEffect(() => {
    if (query) {
      const filtered = allNotes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(allNotes);
    }
  }, [query, allNotes]);

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
              {LANGUAGE.createNote}
            </button>

            <form>
              <input
                onChange={handleSearch}
                type="text"
                name="search"
                id="search"
                className="input text-sm min-w-[400px] py-1.5 px-2.5"
                placeholder={LANGUAGE.placeholderSearch}
              />
            </form>
          </div>
          <h1 className="mt-5 mb-4 text-2xl font-semibold dark:text-white">
            {LANGUAGE.title}
          </h1>

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
            <h1 className="dark:text-red-500">{LANGUAGE.emptyNotes}</h1>
          )}
        </div>
      </section>

      <ModalAdd open={open} onClose={() => setOpen(false)} />
    </AppLayout>
  );
};

export default HomePage;
