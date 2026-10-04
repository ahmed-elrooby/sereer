
"use client";

import React from "react";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

const Forget = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
  });

  const handleSubmit = (values) => {
    // هنا هنربطه بالـ API بعدين
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>

          {/* Email */}
          <div>
            <label htmlFor="email">
              البريد الإلكتروني
            </label>

            <Field
              id="email"
              type="email"
              name="email"
              placeholder="أدخل البريد الإلكتروني"
            />

            <ErrorMessage
              name="email"
              component="p"
            />
          </div>

          {/* Submit */}
          <button type="submit">
            إرسال رابط الاستعادة
          </button>

        </Form>
      </Formik>
    </div>
  );
};

export default Forget;
