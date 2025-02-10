import PropTypes from "prop-types";
import { ChangeEvent } from "react";

interface InputField {
  title: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ title, type, value, onChange }: InputField) => {
  return (
    <div className="mb-3">
      <label htmlFor={title} className="block mb-1">
        {title}
      </label>
      <input
        type={type}
        name={title}
        id={title}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 text-base border rounded-md outline-none"
      />
    </div>
  );
};

export default InputField;

InputField.propsTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
