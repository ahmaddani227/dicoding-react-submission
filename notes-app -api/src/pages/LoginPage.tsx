import AuthLayouts from "../Components/Layouts/AuthLayouts";
import useAlert from "../hooks/useAlert";
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { login, putAccessToken } from "../utils/notes";
import { useUserStore } from "../store/useUserStore";
import useUserLogged from "../hooks/useUserLogged";
import InputField from "../Components/InputField";
import { languageStore } from "../store/languageStore";
import { LanguageLogin } from "../constant/language";

interface LoginResponse {
  error?: boolean;
  data: any;
}

interface FormValues {
  email: string;
  password: string;
}

const initialValue = {
  email: "",
  password: "",
};

const LoginPage = () => {
  useUserLogged();

  const { language } = languageStore();
  const LANGUAGE = language === "en" ? LanguageLogin.en : LanguageLogin.id;

  const { showAlertToast } = useAlert();
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const registerFormSchema = Yup.object({
    email: Yup.string()
      .required(LANGUAGE.requiredEmail)
      .email(LANGUAGE.validEmail),
    password: Yup.string()
      .min(6, LANGUAGE.minPassword)
      .max(15, LANGUAGE.maxPassword)
      .required(LANGUAGE.requiredPassword),
  });

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
      showAlertToast(LANGUAGE.alertSuccessLogin);
      navigate("/");
    }
    resetForm();
  };

  return (
    <AuthLayouts title={LANGUAGE.title} type="login">
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
              {isSubmitting ? `${LANGUAGE.title}...` : `${LANGUAGE.title}`}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayouts>
  );
};

export default LoginPage;
