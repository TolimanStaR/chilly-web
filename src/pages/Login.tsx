import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useAuthStore from '@/stores/AuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextInput } from '@/components/input';
import {LoginSchema} from "@/lib";
import {useEffect} from "react";

type LoginFormData = z.infer<typeof LoginSchema>;

export const Login = () => {
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login({ ...data, role: "BUSINESS" }, () => navigate('/profile'));
  };

  useEffect(() => {
    document.title = "Вход"
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="w-full max-w-md m-auto space-y-4 py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Вход
          </h2>
        </div>

        {error && (
          <div className={"flex w-full items-center justify-center px-4 py-2 bg-red-5 rounded-2xl"}>
            <p className={"text-bodyM text-red-70"}>{error}</p>
          </div>
        )}

        <form className="mt-4 space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md space-y-4">
            <TextInput
              title={"Email"} required type={"email"}
              {...register('username')}
              autoComplete={"email"}
              errorMessage={errors.username?.message}
            />

            <TextInput
              title={"Пароль"} required type={"password"}
              {...register('password')}
              autoComplete="current-password"
              errorMessage={errors.password?.message}
            />
          </div>

          <div className="flex w-full items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-right text-sm w-full font-medium text-blue-600 hover:text-blue-500"
            >
              Забыли пароль?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 justify-center"
            disabled={loading} isLoading={loading}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Ещё нет аккаунта? </span>
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
