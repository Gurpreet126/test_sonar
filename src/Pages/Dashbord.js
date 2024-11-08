import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import Sidebar2 from "../Component/Sidebar2";
import { GlobalStyle } from "../Styles/Globalstyle";
import { darkTheme, lightTheme } from "../Styles/Theme";

import Navbar from "../Component/Navbar";
import { Outlet } from "react-router-dom";
import { Main, Wrappermain } from "StyledComponents";

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  const contextValue = useMemo(() => ({ setTheme, theme }), [setTheme, theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyle />
        <Main>
          <Navbar />
          <Wrappermain>
            <Sidebar2 />
            <div className="outlet">
              <Outlet />
            </div>
          </Wrappermain>
        </Main>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
