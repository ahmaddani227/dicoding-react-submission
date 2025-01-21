import { useParams } from "react-router-dom";
import AppLayout from "../Components/Layouts/AppLayout";
import { getNote } from "../utils";
import NotFound from "./404";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <NotFound message="Invalid ID" />;
  }

  const note = getNote(id);

  if (!note) {
    return <NotFound message="Note not found" />;
  }

  return (
    <AppLayout>
      <section className="min-h-[calc(100vh-120px)] py-5">
        <div className="container">
          <h1 className="text-2xl font-bold">{note.title}</h1>
          <span className="inline-block mb-3 text-sm font-medium text-slate-600">
            {note.createdAt}
          </span>
          <p className="font-normal text-justify text-bases">{note.body}</p>
        </div>
      </section>
    </AppLayout>
  );
};

export default DetailPage;
