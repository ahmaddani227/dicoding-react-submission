import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUserLogged } from "../utils/notes";
import { useUserStore } from "../store/useUserStore";

const useRedirectIfAuthenticated = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();

    if (!user && token) {
      getUserLogged().then((response) => {
        if (!response.error && response.data) {
          setUser(response.data);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (!loading && (user || localStorage.getItem("accessToken"))) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);
};

export default useRedirectIfAuthenticated;
