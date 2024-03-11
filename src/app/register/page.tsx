"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Try again");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className=" p-8 rounded shadow-md w-96 bg-[#212121]">
        <h1 className="text-4xl text-center mb-5">Register</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="email"
                className="w-full border border-gray-300 text-white  rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-white"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-[16px] mb-4"
              />
              <Field
                type="password"
                name="password"
                className="w-full border border-gray-300 text-white rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-white"
                placeholder="Password"
                required
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-[16px] mb-4"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
              <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
            </Form>
          )}
        </Formik>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;
