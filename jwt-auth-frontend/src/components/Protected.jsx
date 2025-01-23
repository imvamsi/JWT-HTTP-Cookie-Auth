import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../slice/apiSlice";
import { logout } from "../slice/authSlice"; // Assuming you have the logOut action to clear token

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser, { isLoading, isSuccess, isError }] =
    useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      await logoutUser().unwrap();

      // Dispatch Redux action to clear user data
      dispatch(logout());

      // Redirect user to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // You can check the `isLoading`, `isSuccess`, and `isError` states to show loading or error messages if needed.

  return (
    <div>
      <h2>Welcome, Protected Page</h2>
      <button onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      <p>This is a protected page. You are logged in.</p>
      {children}
    </div>
  );
};

export default Protected;
