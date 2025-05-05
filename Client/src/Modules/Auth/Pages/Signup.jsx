import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";

// Validation schema
const signupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  //   const handleSubmit = async (values, { resetForm }) => {
  //     try {
  //       const response = await axiosInstance.post("/api/auth/register", values);
  //       if (response.status == 201) {
  //         toast.success(`${response?.data?.message}`);
  //       } else {
  //         toast.error(`${response?.data?.message}`);
  //       }
  //       resetForm();
  //     } catch (error) {
  //       toast.error(`${error?.message}`);
  //       resetForm();
  //     }
  //   };
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", values);
      if (response.status === 201) {
        toast.success(response?.data?.message || "Signup successful");
        resetForm();
        // Optional: Navigate after success
        setTimeout(() => navigate("/signin"), 1500);
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {formik.isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Link to Signin */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
