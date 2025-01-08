import { jwtDecode } from "jwt-decode";

// Example of decoding a JWT and extracting specific fields
export const decodeAccessTokenInStorage = (): any | null => {
  const token = localStorage.getItem("accessToken"); // Get the JWT from localStorage

  if (!token) {
    console.error("JWT not found in localStorage.");
    return null;
  }

  try {
    const decoded = jwtDecode<any>(token); 
    Object.keys(decoded).forEach((key) => {
        const value = decoded[key];
        localStorage.setItem(key, value); 
      });
    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
