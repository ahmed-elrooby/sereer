"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // البيانات تعتبر Fresh لمدة 5 دقائق
      staleTime: 1000 * 60 * 5,

      // حذف البيانات من الـ Cache بعد 30 دقيقة من عدم استخدامها
      gcTime: 1000 * 60 * 30,

      // عدم إعادة الطلب عند الرجوع للـ Tab
      refetchOnWindowFocus: false,

      // عدم إعادة الطلب تلقائيًا عند Mount لو البيانات Fresh
      refetchOnMount: false,

      // إعادة المحاولة مرة واحدة عند حدوث خطأ
      retry: 1,
    },

    mutations: {
      // الـ mutations مش محتاجة Retry تلقائي
      retry: 0,
    },
  },
});

const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;