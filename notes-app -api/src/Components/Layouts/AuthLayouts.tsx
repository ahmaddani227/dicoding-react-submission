import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkMode";
import { TbHaze, TbHazeMoon } from "react-icons/tb";

interface AuthLayouts extends React.PropsWithChildren {
  title: string;
  type: string;
}

const AuthLayouts = ({ children, title, type }: AuthLayouts) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <section className="flex items-center justify-center min-h-screen dark:bg-slate-900">
      <div className="min-w-80">
        <h1 className="mb-1 text-4xl font-bold dark:text-blue-500">{title}</h1>
        <p className="mb-3 dark:text-white">
          {type == "login" ? "Login to your account" : "Register your account"}
        </p>
        {children}

        <hr className="mb-2 dark:border-slate-700" />

        <AuthNavigation type={type} />
      </div>

      {/* Dark Mode Toggle */}
      <div className="absolute w-10 h-10 p-2 border rounded-full shadow-lg dark:border-slate-600 border-slate-200 top-4 right-4 dark:shadow-slate-700">
        <button onClick={toggleDarkMode} className="w-full h-full">
          {isDarkMode ? (
            <TbHaze className="w-full h-full dark:text-white" />
          ) : (
            <TbHazeMoon className="w-full h-full dark:text-white" />
          )}
        </button>
      </div>
    </section>
  );
};

const AuthNavigation = ({ type }: { type: string }) => {
  if (type == "login") {
    return (
      <p className="text-center dark:text-white">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register
        </Link>
      </p>
    );
  } else {
    return (
      <p className="text-center dark:text-white">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    );
  }
};

export default AuthLayouts;

AuthNavigation.propsTypes = {
  type: PropTypes.string,
};

AuthLayouts.propsTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  type: PropTypes.string,
};
