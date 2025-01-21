import PropTypes from "prop-types";
import { Link } from "react-router-dom";

type CardProps = {
  data: {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
  };
  deleteNote: (id: string) => void;
  action: (id: string) => void;
};

const Card = ({ data, deleteNote, action }: CardProps) => {
  const { id, title, body, createdAt, archived } = data;

  return (
    <div className="flex flex-col justify-between w-full p-3 border rounded-lg border-slate-200">
      <div>
        <div className="mb-2.5">
          <Link
            to={`/notes/${id}`}
            className="text-lg font-bold mb-0.5 block hover:underline cursor-pointer w-max"
          >
            {title}
          </Link>
          <span className="inline-block text-sm font-medium text-slate-600">
            {createdAt}
          </span>
        </div>
        <p className="mb-4 text-justify">{body}</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => action(id)}
          className="text-base font-semibold text-orange-400"
        >
          {archived ? "Unarchive" : "Archive"}
        </button>

        <button
          onClick={() => deleteNote(id)}
          className="text-base font-semibold text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Card;
