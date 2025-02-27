"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  GoogleBtn,
  ModalContent,
  Title,
  Description,
  Form,
  ModalInput,
  SubmitButton,
  ChangeModalButton,
} from "../Modal.styles";
import { signIn as googleSignIn } from "next-auth/react";
import { Icon } from "@/components/common/Icon";
import { useSignInMutation } from "@/lib/redux/features/user/userApi";
import Notiflix from "notiflix";

const SignInModal = ({
  setType,
}: {
  setType: Dispatch<SetStateAction<string>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { data, error, isLoading }] = useSignInMutation();

  useEffect(() => {
    if (data) {
      Notiflix.Notify.success("Вхід успішний!");
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
      window.location.replace("/account");
    }
  }, [data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signIn({ email, password });

    } catch (err: any) {
      console.error("Error while logging in", err);
      Notiflix.Notify.failure("Помилка при вході в аккаунт ", err.status);
    }
  };

  return (
    <ModalContent>
      <Title>Увійти в кабінет</Title>
      <Description>
        Увійдіть, щоб додавати товари у обране і бачити свої замовлення
      </Description>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <ModalInput
          placeholder="Імейл"
          onChange={(evt) => setEmail(evt.target.value)}
          required
        />
        <ModalInput
          placeholder="Пароль"
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
        <SubmitButton type="submit">Увійти</SubmitButton>
      </Form>
      <Description className="google">Або увійдіть за допомогою:</Description>
      <GoogleBtn
        onClick={() => {
          googleSignIn();
        }}
      >
        <Icon name="google" size="24" />
      </GoogleBtn>
      <Description>
        Немає профілю?
        <ChangeModalButton
          onClick={() => {
            setType("sign-up");
          }}
        >
          Реєстрація
        </ChangeModalButton>
      </Description>
    </ModalContent>
  );
};

export default SignInModal;
