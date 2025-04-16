import { useState } from 'react';
import {Controller, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordFlow } from '@/types/auth';
import {EmailSchema, VerificationCodeSchema, NewPasswordSchema} from "@/lib/validation/auth";
import {TextInput, Button, CodeInput} from '@/components/input';

export const ForgotPassword = () => {
  const [flowData, setFlowData] = useState<ForgotPasswordFlow>({
    email: '',
    code: '',
    newPassword: '',
    newPasswordRepeat: '',
    currentStep: 'email'
  });

  // Шаг 1: Ввод email
  const emailForm = useForm({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: flowData.email }
  });

  // Шаг 2: Ввод кода
  const codeForm = useForm({
    resolver: zodResolver(VerificationCodeSchema),
    defaultValues: { code: flowData.code }
  });

  // Шаг 3: Ввод пароля
  const passwordForm = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { newPassword: flowData.newPassword, newPasswordRepeat: flowData.newPasswordRepeat }
  });

  const handleEmailSubmit = async ({ email }: { email: string }) => {
    // TODO: Запрос кода на бек
    console.log('Запрос кода для email:', email);
    setFlowData(prev => ({ ...prev, email, currentStep: 'verifyCode' }));
  };

  const handleCodeSubmit = async ({ code }: { code: string }) => {
    // TODO: проверка кода
    console.log('Проверка кода:', code);
    setFlowData(prev => ({ ...prev, code, currentStep: 'newPassword' }));
  };

  const handlePasswordSubmit = async ({ newPassword }: { newPassword: string }) => {
    // TODO: Отправка нового пароля
    console.log('Обновление пароля для:', flowData.email, newPassword);
  };

  const { watch } = passwordForm;
  const password = watch("newPassword");
  const repeat = watch("newPasswordRepeat");

  return (
    <div className="flex h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md m-auto rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {flowData.currentStep === 'email' && 'Восстановление пароля'}
          {flowData.currentStep === 'verifyCode' && 'Введите код подтверждения'}
          {flowData.currentStep === 'newPassword' && 'Новый пароль'}
        </h2>

        {/* Прогресс-бар */}
        <div className="flex mx-auto max-w-[300px] mb-8">
          {['email', 'verifyCode', 'newPassword'].map((step, i) => (
            <div key={step} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${flowData.currentStep === step ? 'bg-red-50 text-white' :
                flowData.currentStep.length > step.length ? 'bg-green-500 text-white' : 'bg-base-20'}`}
              >
                {i + 1}
              </div>
              <div className={`text-caption mt-1 ${flowData.currentStep === step ? 'text-red-50' : 'text-base-40'}`}>
                {step === 'email' ? 'Email' :
                  step === 'verifyCode' ? 'Код' : 'Пароль'}
              </div>
            </div>
          ))}
        </div>

        {/* Формы */}
        {flowData.currentStep === 'email' && (
          <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
            <TextInput
              title="Email"
              {...emailForm.register('email')}
              errorMessage={emailForm.formState.errors.email?.message}
            />
            <Button type="submit" className="w-full mt-4">
              Продолжить
            </Button>
          </form>
        )}

        {flowData.currentStep === 'verifyCode' && (
          <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)} autoComplete={"off"}>
            <Controller
              control={codeForm.control}
              name="code"
              render={({ field }) => (
                <CodeInput
                  value={field.value}
                  onChange={field.onChange}
                  error={codeForm.formState.errors.code?.message}
                  onComplete={(code) => {
                    field.onChange(code);
                    setFlowData({ ...flowData, code });
                  }}
                />
              )}
            />

            <div className="text-sm text-base-40 mt-2">
              Код отправлен на {flowData.email}
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <Button type="submit" className="w-full">
                Подтвердить код
              </Button>

              <p
                onClick={() =>
                  setFlowData((prev) => ({ ...prev, currentStep: "email" }))
                }
                className="text-center text-sm w-full font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              >
                Изменить email
              </p>
            </div>
          </form>
        )}

        {flowData.currentStep === 'newPassword' && (
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
            <div className={"flex flex-col gap-2"}>
              <TextInput
                autoComplete={"new-password"}
                title="Новый пароль"
                type="password"
                {...passwordForm.register('newPassword')}
                errorMessage={passwordForm.formState.errors.newPassword?.message}
              />

              <TextInput
                autoComplete={"off"}
                title="Повторите пароль"
                type="password"
                {...passwordForm.register('newPasswordRepeat')}
                errorMessage={passwordForm.formState.errors.newPasswordRepeat?.message}
              />
            </div>

            <Button type="submit" className="w-full mt-4" disabled={!(password && repeat && password === repeat)}>
              Сохранить пароль
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
