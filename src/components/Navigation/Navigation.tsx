import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLogout,
  logout,
  selectIsAuthenticated,
} from "../../store/auth/authSlice";
import styled from "styled-components";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../../context/ThemeHooks/useTheme";

const Navigation = () => {
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

export default Navigation;

interface ThemeProps {
  theme: "light" | "dark";
}

const Container = styled.nav<ThemeProps>`
  padding: 1rem;
  background-color: ${({ theme }) => (theme === "dark" ? "#2c2c2c" : "#fff")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    .logoutBtn {
      padding: 0.5rem 1rem;
      background-color: #e53e3e;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        background-color: #c82333;

        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }

      &:focus {
        outline: 2px solid #dc3545;
        outline-offset: 2px;
      }
    }
  }
`;

const NavLink = styled(Link)<ThemeProps>`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#333333" : "#fff")};
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  }

  &:active {
    transform: translateY(1px);
  }
`;
