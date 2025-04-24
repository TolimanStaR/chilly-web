import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '@/stores/AuthStore';
import {Button, TextInput} from "@/components/input";
import { RegistrationSchema } from "@/lib";
import {Link, useNavigate} from "react-router-dom";
import { RegisterData } from '@/types/auth';

export const Register = () => {
  const { register: authRegister, loading } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterData  & { repeatPassword: string }>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      businessCategories: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "businessCategories"
  });

  const onSubmit = (data: RegisterData) => {
    authRegister(data, () => navigate("/login"));
  };

  const password = watch('password');
  const repeatPassword = watch('repeatPassword');

  return (
    <div className={"flex flex-col h-full w-full"}>
      <div className="flex flex-col space-y-4 h-fit w-fit m-auto p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Регистрация
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full max-w-md">
          <TextInput
            title="Email" required type="email" autoComplete={"email"}
            {...register('email')}
            errorMessage={errors.email?.message}
          />

          <TextInput
            title="Номер телефона" required type="tel" autoComplete="tel"
            {...register('phoneNumber')}
            errorMessage={errors.phoneNumber?.message}
          />

          <TextInput
            title="Пароль" required type="password" autoComplete={"new-password"}
            {...register('password')}
            errorMessage={errors.password?.message}
          />

          <TextInput
            title="Повторите пароль" required type="password" autoComplete={"off"}
            {...register('repeatPassword')}
            errorMessage={
              repeatPassword && password !== repeatPassword
                ? 'Пароли не совпадают'
                : undefined
            }
          />

          <div className={"h-[3px] w-full bg-base-5 my-4"}/>

          <TextInput
            title="Наименование организации" required autoComplete={"organization"}
            {...register('companyName')}
            errorMessage={errors.companyName?.message}
          />

          <TextInput
            title="Юридический адрес" required autoComplete={"street-address"}
            {...register('legalAddress')}
            errorMessage={errors.legalAddress?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextInput title="ИНН" required {...register('inn')} autoComplete={"off"} errorMessage={errors.inn?.message}/>
            <TextInput title="КПП" {...register('kpp')} autoComplete={"off"} errorMessage={errors.kpp?.message}/>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Категории бизнеса (ОКВЭД)</label>

            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-end">
                <TextInput
                  title={"Код"} autoComplete="off"
                  {...register(`businessCategories.${index}.code` as const)}
                  errorMessage={errors.businessCategories?.[index]?.code?.message}
                />

                <TextInput
                  title={"Название"} autoComplete="off"
                  {...register(`businessCategories.${index}.name` as const)}
                  errorMessage={errors.businessCategories?.[index]?.name?.message}
                />

                <Button
                  variant={"tertiary"} size={"M"}
                  onClick={() => remove(index)}
                >
                  ✕
                </Button>
              </div>
            ))}

            <Button
              type="button" variant="tertiary" size="S" className={"mx-auto"}
              onClick={() => append({code: '', name: ''})}
            >
              + Добавить категорию
            </Button>

            {typeof errors.businessCategories?.message === 'string' && (
              <p className="text-sm text-red-500">{errors.businessCategories.message}</p>
            )}
          </div>

          <Button
            type="submit" variant="primary" size="M" className="w-full mt-4"
            disabled={loading || password !== repeatPassword} isLoading={loading}
          >
            Зарегистрироваться
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Уже есть аккаунт? </span>
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
