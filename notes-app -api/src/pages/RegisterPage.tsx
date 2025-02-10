import { useNavigate } from "react-router-dom";
import AuthLayouts from "../Components/Layouts/AuthLayouts";
import useAlert from "../hooks/useAlert";
import * as Yup from "yup";
import { Formik, FormikHelpers, Field, ErrorMessage, Form } from "formik";
import { register } from "../utils/notes";

interface RegisterResponse {
  error?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  confPassword: string;
}

const registerFormSchema = Yup.object({
  name: Yup.string()
    .required("Field name harus diisi")
    .min(4, "Field name minimal 4 karakter")
    .max(15, "Field name minimal 15 karakter"),
  email: Yup.string()
    .required("Field email harus diisi")
    .email("Email tidak valid"),
  password: Yup.string()
    .min(6, "Password minimal 5 Karakter")
    .max(15, "Password maksimal 15 karakter")
    .required("Field password harus diisi"),
  confPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Conf Password harus sama")
    .required("Conf Password harus diisi"),
});

const initialValue = {
  name: "",
  email: "",
  password: "",
  confPassword: "",
};

const RegisterPage = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSubmitFormik = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const { name, email, password } = values;
    const response: RegisterResponse = await register({
      name,
      email,
      password,
    });

    if (!response.error) {
      showAlert("Success", "Registrasi Berhasil", "success");
      navigate("/login");
    }
    resetForm();
  };

  return (
    <AuthLayouts title="Registrasi" type="register">
      <Formik
        initialValues={initialValue}
        validationSchema={registerFormSchema}
        onSubmit={handleSubmitFormik}
      >
        {({ isSubmitting }) => (
          <Form className="mb-3">
            <div className="mb-4">
              <label className="block mb-1">Nama</label>
              <Field
                type="text"
                name="name"
                className="w-full px-2 py-1 text-base border rounded-md outline-none"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-2 py-1 text-base border rounded-md outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-2 py-1 text-base border rounded-md outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Konfirmasi Password</label>
              <Field
                type="password"
                name="confPassword"
                className="w-full px-2 py-1 text-base border rounded-md outline-none"
              />
              <ErrorMessage
                name="confPassword"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayouts>
  );
};

export default RegisterPage;
