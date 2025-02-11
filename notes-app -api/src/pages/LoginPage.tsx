import AuthLayouts from "../Components/Layouts/AuthLayouts";
import useAlert from "../hooks/useAlert";
import * as Yup from "yup";
import { Formik, FormikHelpers, Field, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { login, putAccessToken } from "../utils/notes";
import { useUserStore } from "../store/useUserStore";
import useUserLogged from "../hooks/useUserLogged";

interface LoginResponse {
  error?: boolean;
  data: any;
}

interface FormValues {
  email: string;
  password: string;
}

const registerFormSchema = Yup.object({
  email: Yup.string()
    .required("Field email harus diisi")
    .email("Email tidak valid"),
  password: Yup.string()
    .min(6, "Password minimal 6 Karakter")
    .max(15, "Password maksimal 15 karakter")
    .required("Field password harus diisi"),
});

const initialValue = {
  email: "",
  password: "",
};

const LoginPage = () => {
  useUserLogged();

  const { showAlertToast } = useAlert();
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleLogin = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const { email, password } = values;
    const response: LoginResponse = await login({
      email,
      password,
    });

    if (!response.error) {
      setUser({ email });
      putAccessToken(response.data.accessToken);
      showAlertToast("Login Berhasil");
      navigate("/");
    }
    resetForm();
  };

  return (
    <AuthLayouts title="Login" type="login">
      <Formik
        initialValues={initialValue}
        validationSchema={registerFormSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="mb-3">
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full px-2 py-1 text-base border rounded-md outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full px-2 py-1 text-base border rounded-md outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Login..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayouts>
  );
};

export default LoginPage;
