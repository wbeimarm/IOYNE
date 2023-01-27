import "./App.css";
import ResponsiveAppBar from "./components/nav/Nav";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { green, purple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  }
});

import Home from "./components/vistas/Home";
import Login from "./components/seguridad/Login";
import Logout from "./components/seguridad/Logout";

function App() {
  return (
    <ThemeProvider theme={theme}>
         <div className="App">
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
        </div>
    </ThemeProvider>
  );
}

export default App;
