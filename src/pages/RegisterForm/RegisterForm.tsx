import {
  useState,
  useEffect,
  type FC,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RegisterData, RegisterErrors, RootState } from "@/types/types";
import type { AppDispatch } from "@/store/store";
import { clearError, registerUser } from "@/store/auth/authSlice";
import { useTheme } from "@/context/ThemeHooks/useTheme";
import { Container, SubmitButton } from './RegisterForm.styles'

export const RegisterForm: FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    password: "",
    age: undefined,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error, token } = useSelector(
    (state: RootState) => state.auth
  );
  const { theme } = useTheme();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};

    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    if (formData.age !== undefined) {
      if (formData.age < 0 || formData.age > 150) {
        newErrors.age = "Возраст должен быть от 0 до 150 лет";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSend = { ...formData };
      if (dataToSend.age === undefined) {
        delete dataToSend.age;
      }
      const result = await dispatch(registerUser(dataToSend));
      if (registerUser.fulfilled.match(result)) {
        navigate("/");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "number" && name === "age") {
      setFormData({
        ...formData,
        [name]: value === "" ? undefined : parseInt(value, 10),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (errors[name as keyof RegisterErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }

    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <Container theme={theme}>
      <div className="register_form">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && <span>{errors.password}</span>}
          </div>

          <div>
            <input
              type="number"
              name="age"
              placeholder="Возраст"
              value={formData.age === undefined ? "" : formData.age}
              onChange={handleChange}
              min="0"
              max="150"
            />
            <span className="optional">(необязательно)</span>
            {errors.age && <span>{errors.age}</span>}
          </div>

          {error && <div className="serverError">{error}</div>}

          <SubmitButton
            type="submit"
            disabled={status !== "idle"}
            theme={theme}
          >
            {status !== "idle" ? "Регистрация..." : "Зарегистрироваться"}
          </SubmitButton>
        </form>

        <p>
          Уже есть аккаунт? <Link to="/login">Войти здесь</Link>
        </p>
      </div>
    </Container>
  );
};



