import { useState, ChangeEvent, FormEvent } from "react";
import Modal from "./Layouts/ModalLayout";
import { addNote, getActiveNotes } from "../utils";
import { useNotes } from "../context/Notes";

interface ModalAddProps {
  open: boolean;
  onClose: () => void;
}

const ModalAdd = ({ open, onClose }: ModalAddProps) => {
  const { setNotes } = useNotes();

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const maxLength = 50;
  const [remainingChars, setRemainingChars] = useState<number>(maxLength);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newLength = event.target.value.length;
    if (newLength <= maxLength) {
      setTitle(event.target.value);
      setRemainingChars(maxLength - newLength);
    }
  };

  const handleChangeDesc = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(event.target.value);
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addNote({ title, body: desc });
    setNotes(getActiveNotes());

    setTitle("");
    setDesc("");
    setRemainingChars(maxLength);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h1 className="mb-2 text-2xl font-semibold">Add Note</h1>
      <form onSubmit={handleAdd}>
        <div className="mb-2">
          <p
            className={`mb-1 text-xs text-end ${
              remainingChars === 0 ? "text-red-500" : "text-slate-400"
            }`}
          >
            Sisa Karakter {remainingChars}
          </p>
          <input
            value={title}
            onChange={handleChangeTitle}
            type="text"
            name="title"
            className={`border border-slate-300 py-1.5 px-2 outline-none rounded text-sm w-full ${
              remainingChars === 0 && "text-red-500 border-red-500"
            }`}
          />
        </div>
        <div className="mb-2">
          <textarea
            value={desc}
            onChange={handleChangeDesc}
            name="body"
            id="body"
            className="border border-slate-300 py-1.5 px-2 outline-none rounded text-sm resize-none w-full h-24"
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 py-1.5 px-4 rounded-md"
        >
          Add Note
        </button>
      </form>
    </Modal>
  );
};

export default ModalAdd;
