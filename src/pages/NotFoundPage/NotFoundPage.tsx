import  { type FC } from "react";
import { useTheme } from "@/context/ThemeHooks/useTheme";
import { Container, HomeLink } from './NotFoundPage.styles'

export const NotFoundPage: FC = () => {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      <h1>404</h1>

      <h2>Страница не найдена</h2>

      <HomeLink to="/" theme={theme}>
        На главную
      </HomeLink>
    </Container>
  );
};




