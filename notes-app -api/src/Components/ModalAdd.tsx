import Modal from "./Layouts/ModalLayout";
import PropTypes from "prop-types";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import { addNote } from "../utils/notes";
import useAlert from "../hooks/useAlert";
import * as Yup from "yup";
import { languageStore } from "../store/languageStore";
import { LanguageHome } from "../constant/language";

interface ModalAddProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  title: string;
  description: string;
}

const initialValue = {
  title: "",
  description: "",
};

const ModalAdd = ({ open, onClose, onSuccess }: ModalAddProps) => {
  const { showAlert } = useAlert();

  const { language } = languageStore();
  const LANGUAGE = language === "en" ? LanguageHome.en : LanguageHome.id;

  const formAddSchema = Yup.object({
    title: Yup.string()
      .required(LANGUAGE.requiredTitle)
      .max(50, LANGUAGE.maxTitle),
    description: Yup.string().required(LANGUAGE.requiredDescription),
  });

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
      showAlert("Success", LANGUAGE.alertSuccess, "success");
      resetForm();
      onSuccess();
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h1 className="mb-2 text-2xl font-semibold dark:text-white">
        {LANGUAGE.titleModal}
      </h1>
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
              {isSubmitting
                ? `${LANGUAGE.titleModal}...`
                : `${LANGUAGE.titleModal}`}
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
  onSuccess: PropTypes.func,
};

export default ModalAdd;
