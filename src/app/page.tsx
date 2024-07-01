"use client";
import { Categories } from "@/components/main/Categories";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Hero } from "@/components/main/Hero";
import { SwiperList } from "@/components/main/SwiperList";
import { Loading } from "@/components/SERVICE_PAGES/Loading";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  useGetBooksQuery,
  useGetDataMutation,
  useGoogleAuthMutation,
  useRefreshTokenMutation,
} from "@/lib/redux/features/user/userApi";
import { BookType, loginOutputDTO } from "@/lib/redux/features/user/types";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();
  const [userData, setUserData] = useState<loginOutputDTO | null>(null);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

  const [
    refreshTokens,
    {
      data: refreshTokenData,
      error: refreshTokenError,
      isLoading: refreshTokenIsLoading,
    },
  ] = useRefreshTokenMutation();

  const [
    googleSignIn,
    {
      data: googleSignInData,
      error: googleSignInError,
      isLoading: googleSignInLoading,
    },
  ] = useGoogleAuthMutation();

  const [
    getUserData,
    {
      data: getUserDataData,
      error: getUserDataError,
      isLoading: getUserDataLoading,
    },
  ] = useGetDataMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.user?.email) {
          const { email, name } = session.user;
          if (name) await googleSignIn({ email, name });
        }
      } catch (error) {
        console.error("Error during Google Sign-In:", error);
      } finally {
        setLoading(false); // Устанавливаем loading в false после загрузки данных
      }
    };

    if (sessionStatus === "authenticated" && loading) {
      fetchData();
    }
  }, [session, sessionStatus, googleSignIn, loading]); // Исправляем зависимости

  let token = localStorage.getItem("accessToken");
  if (!token) token = "1";
  const getBooks = useGetBooksQuery({
    accessToken: token,
    type: BookType.Fav,
  });
  console.log("getBooks");
  console.log(getBooks);
  useEffect(() => {
    getBooks;
    if (googleSignInData) {
      localStorage.setItem("accessToken", googleSignInData.tokens.accessToken);
      localStorage.setItem(
        "refreshToken",
        googleSignInData.tokens.refreshToken
      );
      setUserData(googleSignInData);
    } else if (refreshTokenData) {
      localStorage.setItem("accessToken", refreshTokenData.tokens.accessToken);
      localStorage.setItem(
        "refreshToken",
        refreshTokenData.tokens.refreshToken
      );
      setUserData(refreshTokenData);
    }
  }, [googleSignInData, refreshTokenData]);

  if (
    refreshTokenIsLoading ||
    googleSignInLoading ||
    getUserDataLoading ||
    loading
  ) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <SwiperList />
      <Footer />
    </>
  );
}
