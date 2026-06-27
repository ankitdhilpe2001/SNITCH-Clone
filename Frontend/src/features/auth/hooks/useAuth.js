import { setError, setLoading, setUser } from "../state/auth.slice.js"
import { registerUser } from "../service/auth.api.js"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async (userData) => {
        try {
            dispatch(setLoading(true));     //sets loading to true at the start
            dispatch(setError(null));       //clears any previous error

            const data = await registerUser(userData);

            if (data?.user) {
                dispatch(setUser(data.user));       //stores the user on success
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

    return { handleRegister };
};
