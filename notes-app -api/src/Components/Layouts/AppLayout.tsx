import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    clearUser();
    navigate("/login");
  };
  return (
    <>
      <header className="py-4 border-b border-slate-200">
        <div className="container">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Link to="/" className="text-xl font-bold">
                Notes App
              </Link>

              <h2 className="text-sm font-medium">{user?.email}</h2>
            </div>

            <div className="flex items-center gap-x-4">
              <Link to="/archived" className="text-base font-normal underline ">
                Archived
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 hover:bg-blue-700 transition text-white bg-blue-500 rounded-md"
              >
                Logout
              </button>
            </div>
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
