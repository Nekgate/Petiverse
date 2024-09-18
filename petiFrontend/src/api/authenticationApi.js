import axios from "axios";
import baseUrl from "./baseUrl";

// Function to register a new user
export const registerUser = async userData => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json", // Indicating the request body is JSON
        Accept: "application/json" // Indicating the server should respond with JSON
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

// Function to verify email
export const verifyEmail = async tokenData => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/verify-email`, // backend endpoint
      tokenData, // Data should include the token from the user
      {
        headers: {
          "Content-Type": "application/json", //
          Accept: "application/json"
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
    const response = await axios.post(`${baseUrl}/auth/login`, userData, {
      headers: {
        "Content-Type": "application/json", // Indicating the request body is JSON
        Accept: "application/json" // Indicating the server should respond with JSON
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

// Send reset email
export const sendResetEmail = async email => {
  const response = await axios.post(
    `${baseUrl}/api/v1/auth/forgot-password`,
    email
  );
  return response.data;
};

// Reset password
export const resetPassword = async (token, password) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/auth/reset-password/${token}`,
    { password }
  );
  return response.data;
};
