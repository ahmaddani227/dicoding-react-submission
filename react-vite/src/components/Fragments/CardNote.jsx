import React, { useContext } from "react";

const CardNote = (props) => {
  const { children } = props;
  return (
    <div className="flex flex-col justify-between w-full px-4 py-4 border rounded-lg">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { title, time } = props;
  return (
    <>
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="inline-block mb-2 text-sm text-gray-500">{time}</span>
    </>
  );
};

const Body = (props) => {
  const { children } = props;
  return <p className="mb-3 text-base font-normal text-justify">{children}</p>;
};

const Footer = ({ archived, toggleArchive, deleteNote }) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={deleteNote}
        className="text-base font-semibold text-red-500"
      >
        Delete
      </button>
      <button
        className="text-base font-semibold text-orange-500"
        onClick={toggleArchive}
      >
        {archived ? "Unarchive" : "Archive"}
      </button>
    </div>
  );
};

CardNote.Header = Header;
CardNote.Body = Body;
CardNote.Footer = Footer;

export default CardNote;
