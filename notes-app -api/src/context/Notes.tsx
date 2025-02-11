import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from "react";
import { getActiveNotes, getArchivedNotes } from "../utils/";
import PropTypes from "prop-types";

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
};

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  archivedNotes: Note[];
  setArchivedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: PropsWithChildren) => {
  const [notes, setNotes] = useState<Note[]>(getActiveNotes());
  const [archivedNotes, setArchivedNotes] = useState<Note[]>(
    getArchivedNotes()
  );

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, archivedNotes, setArchivedNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

NotesProvider.propsTypes = {
  children: PropTypes.node,
};
