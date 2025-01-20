import PropTypes from "prop-types";
import { Link } from "react-router-dom";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <header className="py-4 border-b border-slate-200">
        <div className="container">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold">
              Notes App
            </Link>

            <Link to="/archived" className="text-base font-normal underline ">
              Archived
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="py-4 border-t border-l-slate-200">
        <p className="text-center">Note App &copy; 2025</p>
      </footer>
    </>
  );
};

AppLayout.PropsTypes = {
  children: PropTypes.node,
};

export default AppLayout;
