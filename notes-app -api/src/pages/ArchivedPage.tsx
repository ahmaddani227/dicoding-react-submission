import { useEffect, useState } from "react";
import Card from "../Components/Card";
import AppLayout from "../Components/Layouts/AppLayout";
import useAuthGuard from "../hooks/useAuthGuard";
import { getArchivedNotes, deleteNote } from "../utils/notes";
import { unarchiveNote } from "../utils/notes";
import useAlert from "../hooks/useAlert";

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

  const handleUnarchive = async (id: string) => {
    const response: { error: boolean } = await unarchiveNote(id);
    if (!response.error) {
      showAlert("Success", "Data berhasil di unarchive!", "success");
    }
  };

  const handleDelete = async (id: string) => {
    const response: { error: boolean } = await deleteNote(id);
    if (!response.error) {
      showAlert("Success", "Note berhasil dihapus", "success");
    }
  };

  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response: { error: boolean; data: any } = await getArchivedNotes();

      if (!response.error) {
        setArchivedNotes(response.data);
      }
    };

    fetchData();
  }, [handleUnarchive, handleDelete]);

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
