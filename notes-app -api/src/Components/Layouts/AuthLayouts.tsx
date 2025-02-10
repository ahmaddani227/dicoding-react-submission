import PropTypes from "prop-types";
import { Link } from "react-router-dom";

interface AuthLayouts extends React.PropsWithChildren {
  title: string;
  type: string;
}

const AuthLayouts = ({ children, title, type }: AuthLayouts) => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="min-w-80">
        <h1 className="mb-1 text-4xl font-bold">{title}</h1>
        <p className="mb-3">
          {type == "login" ? "Login to your account" : "Register your account"}
        </p>
        {children}

        <hr className="mb-2" />

        <AuthNavigation type={type} />
      </div>
    </section>
  );
};

const AuthNavigation = ({ type }: { type: string }) => {
  if (type == "login") {
    return (
      <p className="text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register
        </Link>
      </p>
    );
  } else {
    return (
      <p className="text-center">
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
