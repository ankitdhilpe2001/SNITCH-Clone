import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
  baseURL: `${backendUrl}/api/auth`,
  withCredentials: true,
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register",userData );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
