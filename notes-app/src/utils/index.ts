type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
};

let notes: Note[] = [
  {
    id: "notes-1",
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-2",
    title: "Functional Component",
    body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-3",
    title: "Modularization",
    body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-4",
    title: "Lifecycle",
    body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-5",
    title: "ESM",
    body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-6",
    title: "Module Bundler",
    body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
];

function getAllNotes(): Note[] {
  return notes;
}

function getNote(id: string): Note | undefined {
  return notes.find((note) => note.id === id);
}

function getActiveNotes(): Note[] {
  return notes.filter((note) => !note.archived);
}

function getArchivedNotes(): Note[] {
  return notes.filter((note) => note.archived);
}

function addNote({ title, body }: { title: string; body: string }): void {
  notes = [
    ...notes,
    {
      id: `notes-${+new Date()}`,
      title: title || "(untitled)",
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    },
  ];
}

function deleteNote(id: string): void {
  notes = notes.filter((note) => note.id !== id);
}

function archiveNote(id: string): void {
  notes = notes.map((note) =>
    note.id === id ? { ...note, archived: true } : note
  );
}

function unarchiveNote(id: string): void {
  notes = notes.map((note) =>
    note.id === id ? { ...note, archived: false } : note
  );
}

function editNote({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}): void {
  notes = notes.map((note) =>
    note.id === id ? { ...note, title, body } : note
  );
}

export {
  getAllNotes,
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  editNote,
  getNote,
  archiveNote,
  unarchiveNote,
  addNote,
};
