import { useNavigate } from "react-router-dom";
import AuthLayouts from "../Components/Layouts/AuthLayouts";
import useAlert from "../hooks/useAlert";
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from "formik";
import { register } from "../utils/notes";
import useUserLogged from "../hooks/useUserLogged";
import InputField from "../Components/InputField";

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
  useUserLogged();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (
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
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mb-3">
            <InputField title="Name" type="text" id="name" />
            <InputField title="Email" type="email" id="email" />
            <InputField title="Password" type="password" id="password" />
            <InputField
              title="Confirm Password"
              type="password"
              id="confPassword"
            />
            <button type="submit" disabled={isSubmitting} className="btn-auth">
              {isSubmitting ? "Register..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayouts>
  );
};

export default RegisterPage;
