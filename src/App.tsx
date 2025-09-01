import { ThemeProvider as StyledThemeProvider } from "styled-components";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, type FC } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

import { ThemeProvider, useTheme } from "@/context";

import { ProfilePage, NotFoundPage,LoginForm, RegisterForm, HomePage } from "@/pages";
import { Navigation,ProtectedRoute } from '@/components'
import { fetchUserProfile, selectAuthToken } from "@/store/auth/authSlice";
import { AppDispatch } from "@/store/store";

const lightTheme = { background: "white", text: "black" };
const darkTheme = { background: "#121212", text: "white" };

type Theme = {
  background: string;
  text: string;
};

const AppContainer = styled.div<{ theme: Theme }>`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const ThemedApp = () => {
  const { theme } = useTheme();
  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <AppContainer>
        <BrowserRouter>
          <div className="app">
            <Navigation />
            <Container>
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
          </div>
        </BrowserRouter>
      </AppContainer>
    </StyledThemeProvider>
  );
};

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [token, dispatch]);

  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

export default App;
