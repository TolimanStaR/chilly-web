import {Controller, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {EmailSchema, VerificationCodeSchema, NewPasswordSchema} from "@/lib/validation/auth";
import {TextInput, Button, CodeInput} from '@/components/input';
import {useForgotPasswordStore} from "@/stores/ForgetPasswordStore.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    email, code, newPassword, newPasswordRepeat,
    currentStep,
    requestCode, verifyCode, resetPassword, goBackToEmail, clearForm,
    loading, error,
  } = useForgotPasswordStore();

  const emailForm = useForm({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: email }
  });

  const codeForm = useForm({
    resolver: zodResolver(VerificationCodeSchema),
    defaultValues: { code: code }
  });

  const passwordForm = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { newPassword: newPassword, newPasswordRepeat: newPasswordRepeat }
  });

  const handleEmailSubmit = ({ email }: { email: string }) => requestCode(email);
  const handleCodeSubmit = ({ code }: { code: string }) => verifyCode(code);
  const handlePasswordSubmit = ({ newPassword }: { newPassword: string }) => {
    resetPassword(newPassword, () => navigate("/login"));
  }

  const { watch } = passwordForm;
  const password = watch("newPassword");
  const repeat = watch("newPasswordRepeat");

  useEffect(() => {
    return () => clearForm()
  }, [clearForm]);

  useEffect(() => {
    document.title = "Восстановление пароля"
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md m-auto rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {currentStep === 'email' && 'Восстановление пароля'}
          {currentStep === 'verifyCode' && 'Введите код подтверждения'}
          {currentStep === 'newPassword' && 'Новый пароль'}
        </h2>

        {/* Прогресс-бар */}
        <div className="flex mx-auto max-w-[300px] mb-8">
          {['email', 'verifyCode', 'newPassword'].map((step, i) => (
            <div key={step} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center select-none 
              ${currentStep === step ? 'bg-red-50 text-white' :
                currentStep.length > step.length ? 'bg-green-500 text-white' : 'bg-base-20'}`}
              >
                {i + 1}
              </div>
              <div className={`text-caption mt-1 ${currentStep === step ? 'text-red-50' : 'text-base-40'}`}>
                {step === 'email' ? 'Email' :
                  step === 'verifyCode' ? 'Код' : 'Пароль'}
              </div>
            </div>
          ))}
        </div>

        {/* Формы */}
        {currentStep === 'email' && (
          <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
            <TextInput
              title="Email"
              {...emailForm.register('email')}
              errorMessage={error ? error : emailForm.formState.errors.email?.message}
            />
            <Button type="submit" className="w-full mt-4" disabled={loading} isLoading={loading}>
              Продолжить
            </Button>

            <Button
              variant={"tertiary"} size={"S"} className={"w-full mt-2"}
              onClick={() => navigate("/login")}
            >
              Назад
            </Button>
          </form>
        )}

        {currentStep === 'verifyCode' && (
          <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)} autoComplete={"off"}>
            <Controller
              control={codeForm.control}
              name="code"
              render={({ field }) => (
                <CodeInput
                  value={field.value}
                  onChange={field.onChange}
                  error={error ? error : codeForm.formState.errors.code?.message}
                  onComplete={(code) => {
                    field.onChange(code);
                    handleCodeSubmit({ code });
                  }}
                />
              )}
            />

            <div className="text-sm text-base-40 mt-2">
              Код отправлен на {email}
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <Button type="submit" className="w-full" disabled={loading} isLoading={loading}>
                Подтвердить код
              </Button>

              <p
                onClick={goBackToEmail}
                className="text-center text-sm w-full font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                Изменить email
              </p>
            </div>
          </form>
        )}

        {currentStep === 'newPassword' && (
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
            <div className={"flex flex-col gap-2"}>
              <TextInput
                autoComplete={"new-password"}
                title="Новый пароль"
                type="password"
                {...passwordForm.register('newPassword')}
                errorMessage={error ? error: passwordForm.formState.errors.newPassword?.message}
              />

              <TextInput
                autoComplete={"off"}
                title="Повторите пароль"
                type="password"
                {...passwordForm.register('newPasswordRepeat')}
                errorMessage={passwordForm.formState.errors.newPasswordRepeat?.message}
              />
            </div>

            <Button
              type="submit" className="w-full mt-4" isLoading={loading}
              disabled={!(password && repeat && password === repeat) || loading}
            >
              Сохранить пароль
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
