import Modal from "./Layouts/ModalLayout";
import PropTypes from "prop-types";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import { addNote } from "../utils/notes";
import useAlert from "../hooks/useAlert";
import * as Yup from "yup";

interface ModalAddProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  title: string;
  description: string;
}

const initialValue = {
  title: "",
  description: "",
};

const formAddSchema = Yup.object({
  title: Yup.string()
    .required("Title harus diisi")
    .max(50, "Title maksimasl 50 karakter"),
  description: Yup.string().required("Deskripsi harus diisi"),
});

const ModalAdd = ({ open, onClose }: ModalAddProps) => {
  const { showAlert } = useAlert();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const { title, description } = values;

    const response: { error: boolean; data: any } = await addNote({
      title,
      body: description,
    });

    if (!response.error) {
      showAlert("Success", "Data Berhasil ditambahkan!", "success");
      resetForm();
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h1 className="mb-2 text-2xl font-semibold dark:text-white">Add Note</h1>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={formAddSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-2">
              <Field type="text" name="title" className={`input py-1.5 px-2`} />
              <ErrorMessage
                name="title"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div className="mb-2">
              <Field
                as="textarea"
                name="description"
                className="input py-1.5 px-2 resize-none h-24"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-500 py-1.5 px-4 rounded-md"
            >
              {isSubmitting ? "Add..." : "Add"}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

ModalAdd.propsTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalAdd;
