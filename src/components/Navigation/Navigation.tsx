import { useDispatch, useSelector } from "react-redux";
import {
  handleLogout,
  logout,
  selectIsAuthenticated,
} from "@/store/auth/authSlice";
import { Container, NavLink} from './Navigation.styles'
import {ThemeToggle} from "@/components";
import { useTheme } from "@/context";

export const Navigation = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogoutClick = () => {
    dispatch(logout());
    handleLogout();
  };

  return (
    <Container theme={theme}>
      <ul>
        <li>
          <NavLink theme={theme} to="/">
            📝 TodoList
          </NavLink>
        </li>
        <li>
          <NavLink theme={theme} to="profile">
            👤 Профиль
          </NavLink>
        </li>

        {!isAuthenticated ? (
          <>
            <li>
              <NavLink theme={theme} to="/login">
                🔑 Войти
              </NavLink>
            </li>
            <li>
              <NavLink theme={theme} to="/register">
                📋 Регистрация
              </NavLink>
            </li>
          </>
        ) : null}
      </ul>

      <div>
        {isAuthenticated && (
          <button className="logoutBtn" onClick={handleLogoutClick}>
            🚪 Выйти
          </button>
        )}
        <ThemeToggle />
      </div>
    </Container>
  );
};



