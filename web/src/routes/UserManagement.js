import React from "react";
import UserList from "../components/User/UserList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Sidebar from "../components/Base/Sidebar";

const defaultTheme = createTheme();
function UserManagement() {
  return <UserList />;
}

export default UserManagement;
