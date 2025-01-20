import PropTypes from "prop-types";
import { deleteNote } from "../utils";

type CardProps = {
  data: {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
  };
};

const Card = ({ data }: CardProps) => {
  const { id, title, body, createdAt, archived } = data;

  return (
    <div className="flex flex-col justify-between w-full p-3 border rounded-lg border-slate-200">
      <div>
        <div className="mb-2.5">
          <h1 className="text-lg font-bold mb-0.5">{title}</h1>
          <span className="inline-block text-sm font-medium text-slate-600">
            {createdAt}
          </span>
        </div>
        <p className="mb-4 text-justify">{body}</p>
      </div>
      <div className="flex items-center justify-between">
        {archived ? (
          <button className="text-base font-semibold text-orange-400">
            Archive
          </button>
        ) : (
          <button className="text-base font-semibold text-orange-400">
            Archive
          </button>
        )}
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
