import { setError, setLoading, setUser } from "../state/auth.slice.js";
import { registerUser, loginUser, getMe } from "../service/auth.api.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (userData) => {
    try {
      dispatch(setLoading(true)); //sets loading to true at the start
      dispatch(setError(null)); //clears any previous error

      const data = await registerUser(userData);

      if (data?.error) {
        dispatch(setError(data.error));
        dispatch(setUser(null));
        return data;
      }

      if (data?.user) {
        dispatch(setUser(data.user)); //stores the user on success
      } else {
        dispatch(setUser(null));
      }

      return data;
    } catch (error) {
      const message = error?.message || "Registration failed";
      dispatch(setError(message));
      return { error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (userData) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await loginUser(userData);

      if (data?.error) {
        dispatch(setError(data.error));
        dispatch(setUser(null));
        return data;
      }

      if (data?.user) {
        dispatch(setUser(data.user));
      } else {
        dispatch(setUser(null));
      }

      return data;
    } catch (error) {
      const message = error?.message || "Login failed";
      dispatch(setError(message));
      return { error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));

      const data = await getMe();

      if (data?.error) {
        dispatch(setError(data.error));
        dispatch(setUser(null));
        return data;
      }

      if (data?.user) {
        dispatch(setUser(data.user));
      } else {
        dispatch(setUser(null));
      }

      return data;
    } catch (error) {
      const message = error?.message || "Failed to fetch user";
      dispatch(setError(message));
      dispatch(setUser(null));
      return { error: message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleRegister, handleLogin, handleGetMe };
};
