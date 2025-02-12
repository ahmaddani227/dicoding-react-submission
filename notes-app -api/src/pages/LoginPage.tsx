import AuthLayouts from "../Components/Layouts/AuthLayouts";
import useAlert from "../hooks/useAlert";
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { login, putAccessToken } from "../utils/notes";
import { useUserStore } from "../store/useUserStore";
import useUserLogged from "../hooks/useUserLogged";
import InputField from "../Components/InputField";

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
            <InputField title="Email" type="email" id="email" />
            <InputField title="Password" type="password" id="password" />
            <button type="submit" disabled={isSubmitting} className="btn-auth">
              {isSubmitting ? "Login..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayouts>
  );
};

export default LoginPage;
