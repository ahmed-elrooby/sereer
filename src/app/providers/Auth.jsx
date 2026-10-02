"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/api.js";
import { useRouter } from "next/navigation.js";

export const authContext = createContext();

const Auth = ({ children }) => {
  const router = useRouter();
  const [loadding, setLoading] = useState(false);
  const profileQuery = useQueryClient();

  // =========================
  // Login
  // =========================

  const handleLogin = async (values) => {
   try {
    setLoading(true);
     const { data } = await api.post("/auth/login", values);

    return data;
  } catch (error) {
    throw error;
  }finally {
    setLoading(false);
  }
  };

  const handleLoginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogin,


    onSuccess:  (data) => {
      toast.success(
        data?.message || "تم تسجيل الدخول بنجاح"
      );
      
      // بعد Login الـCookie اتعملت
      // فنجيب بيانات المستخدم من /profile
       profileQuery.invalidateQueries(["profile"])

      if (data?.user?.role === "platform_admin") {
        router.push("/Admin");
      } else if (data?.user?.role === "hospital_admin") {
        router.push("/Hospital");
      } else {
        router.push("/");
      }
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء تسجيل الدخول"
      );
    },
  });

  const handleLoginSubmit = (values) => {
    handleLoginMutation.mutate(values);
  };

  // =========================
  // Profile
  // =========================

  const getProfile = async () => {
    const { data } = await api.get("/profile");

    return data;
  };

  const {data:profile}=useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  // =========================
  // User
  // =========================

  const user = profile?.data?.user || null;

  const role = user?.role || null;

  return (
    <authContext.Provider
      value={{
        user,
        role,
        profile,

        handleLoginSubmit,

       loadding
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default Auth;