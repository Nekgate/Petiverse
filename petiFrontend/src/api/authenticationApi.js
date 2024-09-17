import axios from "axios";
import baseUrl from "./baseUrl";

// Function to register a new user
export const registerUser = async userData => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/register`,
      userData,
      {
        headers: {
          "Content-Type": "application/json", // Indicating the request body is JSON
          Accept: "application/json" // Indicating the server should respond with JSON
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

// Function to authenticate a user
export const authenticateUser = async userData => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/login`,
      userData,
      {
        headers: {
          "Content-Type": "application/json", // Indicating the request body is JSON
          Accept: "application/json" // Indicating the server should respond with JSON
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
