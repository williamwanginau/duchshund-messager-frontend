import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { fetchUserAPI } from "../api/userAPI";

const useFetchUser = () => {
  const { user, setUserData } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const res = await fetchUserAPI();
        setUserData(res.user);
      }
    };

    fetchUser();
  }, [user, setUserData]);
};

export default useFetchUser;
