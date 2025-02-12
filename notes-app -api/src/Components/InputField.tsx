import { ErrorMessage, Field } from "formik";
import PropTypes from "prop-types";

interface InputFieldProps {
  title: string;
  type: string;
  id: string;
}

const InputField = ({ title, type, id }: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 dark:text-white">
        {title}
      </label>
      <Field type={type} name={id} id={id} className="input" />
      <ErrorMessage
        name={id}
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default InputField;

InputField.propsTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
};
