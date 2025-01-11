import React, { useContext, useState } from "react";
import Modal from "../components/Layouts/ModalLayout";

export default function ModalAdd({ open, onClose, setNotes }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const maxLength = 50;
  const [remainingChars, setRemainingChars] = useState(maxLength);

  const handleChangeTitle = (event) => {
    const newLength = event.target.value.length;
    if (newLength <= maxLength) {
      setTitle(event.target.value);
      setRemainingChars(maxLength - newLength);
    }
  };

  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const note = {
      id: +new Date(),
      title,
      body: desc,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    setNotes((prevNotes) => [...prevNotes, note]);

    setTitle("");
    setDesc("");

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h1 className="mb-2 text-2xl font-semibold">Add Note</h1>
      <form onSubmit={handleAdd}>
        <div className="mb-2">
          <p
            className={`mb-1 text-xs  text-end ${
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
            className={`border border-slate-600 py-1.5 px-2 outline-none rounded text-sm w-full ${
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
            className="border border-slate-600 py-1.5 px-2 outline-none rounded text-sm resize-none w-full h-24"
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
}
