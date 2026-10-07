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
import Cookies from "js-cookie";

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


  onSuccess: (data) => {
  toast.success(
    data?.message || "تم تسجيل الدخول بنجاح"
  );

  Cookies.set("role", data?.user?.role);

  const role = data?.user?.role;

  if (role === "platform_admin") {
    router.push("/Admin");
    return;
  }

  if (role === "hospital_admin") {
    router.push("/Hospital");
    return;
  }

  router.push("/");
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
  
// ================= UPDATE PROFILE ================
const handleUpdateProfile = async (values) => {
  try {
    setLoading(true);
    const { data } = await api.put("/profile", values);
    return data;
  } catch (error) {
    throw error;
  }finally {
    setLoading(false);
  }
}
const [openUpdateProfile, setOpenUpdateProfile] = useState(false);

const handleUpdateProfileMutation = useMutation({
  mutationKey: ["updateProfile"],
  mutationFn: handleUpdateProfile,

  onSuccess:  (data) => {
           profileQuery.invalidateQueries(["profile"])

    toast.success(
      data?.message || "تم تحديث بيانات المستخدم بنجاح"
    );
    setOpenUpdateProfile(false);
  },

  onError: (error) => {
    toast.error(
      error?.response?.data?.message ||
        "حدث خطاء اثناء تحديث بيانات المستخدم"
    );
  },
});

const handleUpdateProfileSubmit = (values) => {
  handleUpdateProfileMutation.mutate(values);
};
// ============== LOGOUT =============
const handleLogout = async () => {
  try {
    setLoading(true);

    const { data } = await api.post("/auth/logout");

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
const handleLogoutMutation = useMutation({
  mutationKey: ["logout"],

  mutationFn: handleLogout,

  onSuccess: (data) => {
    toast.success(
      data?.message || "تم تسجيل الخروج بنجاح"
    );
router.push("/");

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
// ================= FORGET PASSWORD ================
const handleForgetPassword = async (values) => {
  try {
    setLoading(true);
    const { data } = await api.post("/auth/forgot-password", values);
    return data;
  } catch (error) {
    throw error;
  }finally {
    setLoading(false);
  }
}
const handleForgetPasswordMutation = useMutation({
  mutationKey: ["forgetPassword"],
  mutationFn: handleForgetPassword,

  onSuccess:  (data) => {
    toast.success(
      data?.message || "تم ارسال كلمة المرور الى بريدك الالكتروني"
    );
  },

  onError: (error) => {
    toast.error(
      error?.response?.data?.message ||
        "حدث خطاء اثناء ارسال كلمة المرور"
    );
  },
});

const handleForgetPasswordSubmit = (values) => {
  handleForgetPasswordMutation.mutate(values);
};
// ================ RESET PASSWORD =============
const handleResetPassword = async ({token,values}) => {
  try {
    setLoading(true);
    const { data } = await api.post(`/auth/reset-password`,  {
      token,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });
    return data;
  } catch (error) {
    throw error;
  }finally {
    setLoading(false);
  }
}
const handleResetPasswordMutation = useMutation({
  mutationKey: ["resetPassword"],
  mutationFn: handleResetPassword,

  onSuccess:  (data) => {
    toast.success(
      data?.message || "تم تغيير كلمة المرور بنجاح"
    );
    router.push("/")
  },

  onError: (error) => {
    toast.error(
      error?.response?.data?.message ||
        "حدث خطاء اثناء تغيير كلمة المرور"
    );
  },
});

const handleResetPasswordSubmit = ({token,values}) => {
  handleResetPasswordMutation.mutate({token,values});
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
        setOpenUpdateProfile,handleLogoutSubmit,handleForgetPasswordSubmit
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default Auth;