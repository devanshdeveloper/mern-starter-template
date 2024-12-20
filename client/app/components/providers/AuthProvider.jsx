import { useNavigate } from "react-router";
import { createContext, useCallback, useContext, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { auth_flow } from "../../constants/auth_flow";
import { MOCK_API } from "../../constants/env";
import service from "../../utils/service";

export const AuthContext = createContext(null);


function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  useEffect(() => {
    async function asyncHandler() {
      if (!user || !user._id) {
        return;
      }
      if (MOCK_API) {
        return;
      }

      try {
        const updatedUser = await service(apiEndpoints.Users.ReadOne, {
          params: { id: user?._id },
        });
        setUser(updatedUser?.data?.data);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }
    asyncHandler();
  }, []);

  const refetchUser = useCallback(async () => {
    if (!user || !user._id) {
      return;
    }
    try {
      const updatedUser = await service(apiEndpoints.Users.ReadOne, {
        params: { id: user?._id },
      });
      setUser(updatedUser);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  }, [user, setUser]);

  const logout = useCallback(() => {
    setUser(null);
    navigate("/create_account/" + auth_flow[1]);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
