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
    } finally {
      setLoading(false);
    }
  };

  const handleLoginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogin,

 onSuccess: async (data) => {
  await profileQuery.cancelQueries();
  profileQuery.clear();

  Cookies.set("role", data?.user?.role, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  toast.success(data?.message || "تم تسجيل الدخول بنجاح");

  const role = data?.user?.role;

  if (role === "platform_admin") {
    router.replace("/Admin");
    return;
  }

  if (role === "hospital_admin") {
    router.replace("/Hospital");
    return;
  }

  router.replace("/");
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

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  // =========================
  // User
  // =========================

  const user = profile?.data?.user || null;
  const role = user?.role || null;

  // =========================
  // Update Profile
  // =========================

  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);

      const isHospitalAdmin =
        profile?.data?.user?.role === "hospital_admin";

      const payload = {
        user: {
          name: values.name,
          email: values.email,
        },
      };

      if (isHospitalAdmin) {
        payload.facility = {
          name: values.facilityName,
          phone: values.facilityPhone,
          location: {
            type: "Point",
            coordinates: [
              Number(values.longitude),
              Number(values.latitude),
            ],
          },
        };
      }

      const { data } = await api.put("/profile", payload);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);

  const handleUpdateProfileMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: handleUpdateProfile,

    onSuccess: (data) => {
      profileQuery.invalidateQueries({
        queryKey: ["profile"],
      });

      toast.success(
        data?.message || "تم تحديث بيانات المستخدم بنجاح"
      );

      setOpenUpdateProfile(false);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء تحديث بيانات المستخدم"
      );
    },
  });

  const handleUpdateProfileSubmit = (values) => {
    handleUpdateProfileMutation.mutate(values);
  };

  // =========================
  // Logout
  // =========================

  const handleLogout = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/logout");

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: handleLogout,

    onSuccess: async (data) => {
      await profileQuery.cancelQueries();
      profileQuery.clear();

      toast.success(data?.message || "تم تسجيل الخروج بنجاح");

      router.replace("/");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء تسجيل الخروج"
      );
    },
  });

  const handleLogoutSubmit = () => {
    handleLogoutMutation.mutate();
  };

  // =========================
  // Forgot Password
  // =========================

  const handleForgetPassword = async (values) => {
    try {
      setLoading(true);

      const { data } = await api.post(
        "/auth/forgot-password",
        values
      );

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPasswordMutation = useMutation({
    mutationKey: ["forgetPassword"],
    mutationFn: handleForgetPassword,

    onSuccess: (data) => {
      toast.success(
        data?.message ||
          "تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني"
      );
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء إرسال طلب استعادة كلمة المرور"
      );
    },
  });

  const handleForgetPasswordSubmit = (values) => {
    handleForgetPasswordMutation.mutate(values);
  };

  // =========================
  // Reset Password
  // =========================

  const handleResetPassword = async ({ token, values }) => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/reset-password", {
        token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordMutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: handleResetPassword,

    onSuccess: (data) => {
      toast.success(
        data?.message || "تم تغيير كلمة المرور بنجاح"
      );

      router.push("/");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء تغيير كلمة المرور"
      );
    },
  });

  const handleResetPasswordSubmit = ({ token, values }) => {
    handleResetPasswordMutation.mutate({ token, values });
  };

  return (
    <authContext.Provider
      value={{
        user,
        role,
        profile,
        handleLoginSubmit,
        handleResetPasswordSubmit,
        loadding,
        handleUpdateProfileSubmit,
        openUpdateProfile,
        setOpenUpdateProfile,
        handleLogoutSubmit,
        handleForgetPasswordSubmit,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default Auth;