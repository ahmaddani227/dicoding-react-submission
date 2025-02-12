import { useEffect, useState } from "react";
import Card from "../Components/Card";
import AppLayout from "../Components/Layouts/AppLayout";
import useAuthGuard from "../hooks/useAuthGuard";
import { getArchivedNotes, deleteNote } from "../utils/notes";
import { unarchiveNote } from "../utils/notes";
import useAlert from "../hooks/useAlert";
import { LanguageArchive } from "../constant/language";
import { languageStore } from "../store/languageStore";

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
};

const ArchivedPage = () => {
  useAuthGuard();
  const { showAlert } = useAlert();

  const { language } = languageStore();
  const LANGUAGE = language === "en" ? LanguageArchive.en : LanguageArchive.id;
  const [loading, setLoading] = useState<boolean>(true);

  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const response: { error: boolean; data: any } = await getArchivedNotes();

    if (!response.error) {
      setArchivedNotes(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUnarchive = async (id: string) => {
    const response: { error: boolean } = await unarchiveNote(id);
    if (!response.error) {
      showAlert("Success", LANGUAGE.alertUnarchive, "success");
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    const response: { error: boolean } = await deleteNote(id);
    if (!response.error) {
      showAlert("Success", LANGUAGE.alertDelete, "success");
      fetchData();
    }
  };

  return (
    <AppLayout>
      <section className="min-h-[calc(100vh-120px)]">
        <div className="container">
          <h1 className="mt-5 mb-4 text-2xl font-semibold dark:text-white">
            {LANGUAGE.title}
          </h1>

          {loading ? (
            <div className="flex items-center justify-between">
              <div className="loader" />
            </div>
          ) : archivedNotes.length > 0 ? (
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
            <h1 className="dark:text-red-500">{LANGUAGE.emptyData}</h1>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default ArchivedPage;
