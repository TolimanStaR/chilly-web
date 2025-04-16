import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '@/stores/AuthStore';
import { RegisterData } from '@/types/auth';
import {Button, TextInput} from "@/components/input";
import {RegistrationSchema} from "@/lib"
import {Link} from "react-router-dom";

export const Register = () => {
  const { register: authRegister } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegistrationSchema),
  });

  const onSubmit = (data: RegisterData) => {
    authRegister(data);
  };

  return (
    <div className="flex flex-col space-y-4 h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Регистрация
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Email и пароль */}
        <TextInput
          title={"Email"} required type={"email"}
          {...register('email')}
          errorMessage={errors.email?.message}
        />

        <TextInput
          title={"Пароль"} required type={"password"}
          {...register('password')}
          errorMessage={errors.password?.message}
        />

        {/* Юридические данные */}
        <TextInput
          title={"Наименование организации"} required
          {...register('companyName')}
          errorMessage={errors.companyName?.message}
        />

        <TextInput
          title={"Юридический адрес"} required
          {...register('legalAddress')}
          errorMessage={errors.legalAddress?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            title={"ИНН"} required
            {...register('inn')}
            errorMessage={errors.inn?.message}
          />

          <TextInput
            title={"КПП"}
            {...register('kpp')}
            errorMessage={errors.kpp?.message}
          />
        </div>

        <TextInput
          title={"ОКВЭД"} required
          {...register('okved')}
          errorMessage={errors.okved?.message}
        />

        <Button
          type={"submit"} variant={"primary"} size={"M"}
          className={"w-full mt-4"}
        >
          Зарегистрироваться
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-600">Уже есть аккаунт? </span>
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Войти
        </Link>
      </div>
    </div>
  );
}