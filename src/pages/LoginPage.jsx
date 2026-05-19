import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function LoginPage() {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const loginSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const handleLogin = ({ email, password }) => {
    const data = {
      identifier: email,
      password,
    };
    let domain = "https://pos.skyready.online/api";
    let endpoint = "/auth/local";
    let url = domain + endpoint;
    axios
      .post(url, data)
      .then((res) => {
        let jwt = res.data.jwt;
        localStorage.setItem("token", jwt);

        let user = res.data.user;
        toast.success("Welcome To You, in " + user.system_role + " Panel");
        if (user.system_role === "Admin") navigate("/admin");
        else if (user.system_role === "Cashier") navigate("/Cashier");
        else if (user.system_role === "Restaurant") {
          navigate("/inside");
        }
      })
      .catch(() => {
        toast.error("Wrong email or password");
      });
  };

  let inputStyle =
    "w-full border border-[#E2E8F0] px-5 py-4.5 rounded-xl shadow-lg bg-[#F8FAFC] focus:outline-none focus:border-accent-500/70 transition-all duration-300";

  return (
    <div className="w-full min-h-dvh flex flex-col gap-8 justify-center items-center p-10">
      <Formik
        onSubmit={handleLogin}
        initialValues={initialValues}
        validationSchema={loginSchema}
      >
        <Form className="w-108 p-10 rounded-3xl shadow-2xl bg-white flex flex-col gap-8">
          {/*//! Head Title */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4.5 rounded-2xl bg-linear-to-br from-[#10B981] to-[#059669] flex items-center justify-center rotate-12">
              <h3 className="font-medium text-[36px] text-white!">G</h3>
            </div>
            <h1 className="text-[30px] text-primary-500 leading-9 tracking-[-0.75px]">
              Staff Access
            </h1>
            <p className="font-[16px] pt-2 leading-6 text-secondary-500">
              Welcome back, enter your credentials
            </p>
          </div>
          {/*//! Fields */}
          <div className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-[12px] leading-4 tracking-[1.2px] uppercase text-accent-500"
              >
                Staff ID
              </label>
              <div className="relative">
                <Field
                  id="email"
                  name="email"
                  className={inputStyle}
                  placeholder="Enter ID"
                />
                <svg
                  className="absolute top-[50%] translate-y-[-50%] right-4.75"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8334 17.5V15.8333C15.8334 13.9924 14.341 12.5 12.5 12.5H7.50002C5.65907 12.5 4.16669 13.9924 4.16669 15.8333V17.5"
                    stroke="#CAD5E2"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66669 5.83333C6.66669 7.67305 8.1603 9.16667 10 9.16667C11.8397 9.16667 13.3334 7.67305 13.3334 5.83333C13.3334 3.99362 11.8397 2.5 10 2.5C8.1603 2.5 6.66669 3.99362 6.66669 5.83333V5.83333"
                    stroke="#CAD5E2"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <ErrorMessage
                name="email"
                className="text-red-500"
                component="p"
              />
            </div>
            {/* password Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-[12px] leading-4 tracking-[1.2px] uppercase text-accent-500"
              >
                Pin Code
              </label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  className={
                    inputStyle +
                    " placeholder:text-center placeholder:tracking-[24px] placeholder:text-[24px] placeholder:leading-[100%]"
                  }
                  placeholder="••••"
                />
                <svg
                  className="absolute top-[50%] translate-y-[-50%] right-4.75"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.16667 9.16663H15.8333C16.7538 9.16663 17.5 9.91282 17.5 10.8333V16.6666C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6666V10.8333C2.5 9.91282 3.24619 9.16663 4.16667 9.16663V9.16663"
                    stroke="#CAD5E2"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.83331 9.16663V5.83329C5.83331 3.53365 7.70033 1.66663 9.99998 1.66663C12.2996 1.66663 14.1666 3.53365 14.1666 5.83329V9.16663"
                    stroke="#CAD5E2"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <ErrorMessage
                name="password"
                className="text-red-500"
                component="p"
              />
            </div>
            <button className="btn" type="submit">
              Sign In
            </button>
          </div>
          {/*//! Forget */}
          <Link
            to="/forget"
            className="text-center font-medium text-[14px] leading-5 text-secondary-500 transition-colors duration-300 hover:text-accent-500"
          >
            Forgot PIN? Contact Admin
          </Link>
        </Form>
      </Formik>
      <div className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-accent-500"></span>
        <p className="font-medium text-[12px] leading-4 tracking-[1.2px] uppercase text-secondary-400">
          System Secure & Live
        </p>
      </div>
    </div>
  );
}
