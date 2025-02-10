import InputField from "../Components/InputField";
import AuthLayouts from "../Components/Layouts/AuthLayouts";
import useInput from "../hooks/useInput";

const LoginPage = () => {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  return (
    <AuthLayouts title="Login" type="login">
      <form className="mb-3">
        <InputField
          title="Email"
          type="email"
          name="email"
          value={email}
          onChange={onEmailChange}
        />
        <InputField
          title="Password"
          type="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
        />
        <div className="flex justify-end">
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
            Login
          </button>
        </div>
      </form>
    </AuthLayouts>
  );
};

export default LoginPage;
