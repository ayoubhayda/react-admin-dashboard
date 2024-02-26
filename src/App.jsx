import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar } from "./scenes";
import { Outlet } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
          <SideBar />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              maxWidth: "100%",
            }}
          >
            <Navbar />
            <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
