import { useNavigate } from "react-router-dom";
import AuthLayouts from "../Components/Layouts/AuthLayouts";
import useAlert from "../hooks/useAlert";
import * as Yup from "yup";
import { Formik, FormikHelpers, Form } from "formik";
import { register } from "../utils/notes";
import useUserLogged from "../hooks/useUserLogged";
import InputField from "../Components/InputField";
import { languageStore } from "../store/languageStore";
import { LanguageRegister } from "../constant/language";

interface RegisterResponse {
  error?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  confPassword: string;
}

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

  const { language } = languageStore();
  const LANGUAGE =
    language === "en" ? LanguageRegister.en : LanguageRegister.id;

  const registerFormSchema = Yup.object({
    name: Yup.string()
      .required(LANGUAGE.requiredName)
      .min(4, LANGUAGE.minName)
      .max(15, LANGUAGE.maxName),
    email: Yup.string()
      .required(LANGUAGE.requiredEmail)
      .email(LANGUAGE.validEmail),
    password: Yup.string()
      .min(6, LANGUAGE.minPassword)
      .max(15, LANGUAGE.maxPassword)
      .required(LANGUAGE.requiredPassword),
    confPassword: Yup.string()
      .oneOf([Yup.ref("password")], LANGUAGE.matchPassword)
      .required(LANGUAGE.requiredConfPassword),
  });

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
      showAlert("Success", LANGUAGE.alertSuccessRegister, "success");
      navigate("/login");
    }
    resetForm();
  };

  return (
    <AuthLayouts title={LANGUAGE.title} type="register">
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
              {isSubmitting ? `${LANGUAGE.title}...` : `${LANGUAGE.title}`}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayouts>
  );
};

export default RegisterPage;
