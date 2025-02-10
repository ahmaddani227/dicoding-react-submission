import PropTypes from "prop-types";

type NoteFoundProps = { message?: string };

const NotFound = ({ message = "404 | Not Found" }: NoteFoundProps) => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-slate-600">
      <h1 className="text-4xl font-bold text-white">{message}</h1>
    </section>
  );
};

export default NotFound;

NotFound.propsTypes = {
  message: PropTypes.string,
};
