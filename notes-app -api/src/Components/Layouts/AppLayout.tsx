import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDarkMode } from "../../context/DarkMode";
import { TbHaze, TbHazeMoon } from "react-icons/tb";
import { MdLanguage } from "react-icons/md";
import { languageStore } from "../../store/languageStore";
import { LanguageAppLayout } from "../../constant/language";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [userIcon, setUserIcon] = useState<boolean>(false);

  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "id">(
    (localStorage.getItem("language") as "en" | "id") || "en"
  );

  const { language, setLanguage } = languageStore();

  useEffect(() => {
    setLanguage(selectedLanguage);

    localStorage.setItem("language", selectedLanguage);
  }, [selectedLanguage]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    clearUser();
    navigate("/login");
  };

  const LanguageApp =
    language === "en" ? LanguageAppLayout.en : LanguageAppLayout.id;

  return (
    <>
      <header className="py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="container">
          <nav className="flex items-center justify-between dark:text-white">
            <Link to="/" className="text-xl font-bold">
              {LanguageApp.title}
            </Link>

            <div className="flex items-center gap-x-4">
              <Link to="/archived" className="text-base font-normal underline ">
                {LanguageApp.archived}
              </Link>

              <button
                onClick={() =>
                  setSelectedLanguage(selectedLanguage === "en" ? "id" : "en")
                }
              >
                <MdLanguage className="w-8 h-8" />
              </button>

              <button onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <TbHaze className="w-8 h-8" />
                ) : (
                  <TbHazeMoon className="w-8 h-8" />
                )}
              </button>

              <button onClick={() => setUserIcon(!userIcon)}>
                <FaRegUserCircle className="w-8 h-8" />

                {userIcon && (
                  <div
                    className={`absolute  border border-slate-400 rounded-md px-2.5 py-2
                 dark:border-slate-700 dark:bg-slate-800 flex flex-col items-end gap-2 right-20 ${
                   userIcon ? "top-[4.5rem]" : "-top-full"
                 }`}
                  >
                    <p>{user?.email}</p>
                    <button
                      onClick={handleLogout}
                      className="px-2.5 py-1 text-white transition bg-blue-500 rounded-md hover:bg-blue-700"
                    >
                      {LanguageApp.logout}
                    </button>
                  </div>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="py-4 border-t border-l-slate-200 dark:border-slate-700 dark:text-white">
        <p className="text-center">{LanguageApp.footer} &copy; 2025</p>
      </footer>
    </>
  );
};

AppLayout.PropsTypes = {
  children: PropTypes.node,
};

export default AppLayout;
