import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: `${apiBaseUrl}/auth`,
  withCredentials: true,
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    const message =
    error?.response?.data?.message 
    || error?.message 
    || "Registration failed";
    console.error("Registration error:", error?.response?.data || error);
    return { error: message };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/login",userData);
    return response.data;
  } catch (error) {
    const message =
    error?.response?.data?.message
    || error?.message 
    || "LogIn failed";
    console.error("LogIn error:", error?.response?.data || error);
    return { error: message };
  }
};


export const getMe = async() =>{
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (error) {
    const message =
    error?.response?.data?.message 
    || error?.message 
    || "get-me handler failed";
    console.error("error:", error?.response?.data || error);
    return { error: message };
  }
}