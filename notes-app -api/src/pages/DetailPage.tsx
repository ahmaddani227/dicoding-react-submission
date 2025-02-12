// testtt
import { useParams } from "react-router-dom";
import AppLayout from "../Components/Layouts/AppLayout";
import { getNote } from "../utils/notes";
import NotFound from "./404";
import useAuthGuard from "../hooks/useAuthGuard";
import { useEffect, useState } from "react";

const DetailPage = () => {
  useAuthGuard();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <NotFound message="Invalid ID" />;
  }

  type Note = {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
  };

  const [note, setNote] = useState<Note>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response: { error: boolean; data: any } = await getNote(id);

      if (!response.error) {
        setNote(response.data);
      } else {
        setNote(undefined);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <section className="min-h-[calc(100vh-120px)] flex items-center justify-center">
          <div className="loader" />
        </section>
      </AppLayout>
    );
  }

  if (!note) {
    return <NotFound message="Note not found" />;
  }

  return (
    <AppLayout>
      <section className="min-h-[calc(100vh-120px)] py-5">
        <div className="container">
          <h1 className="text-2xl font-bold dark:text-white">{note.title}</h1>
          <span className="inline-block mb-3 text-sm font-medium text-slate-600">
            {new Date(note.createdAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <p className="text-base font-normal text-justify dark:text-white">
            {note.body}
          </p>
        </div>
      </section>
    </AppLayout>
  );
};

export default DetailPage;
