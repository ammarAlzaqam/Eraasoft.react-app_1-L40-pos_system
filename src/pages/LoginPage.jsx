import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
      .catch((err) => {
        toast.error("Wrong email or password");
      });
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <Formik
        onSubmit={handleLogin}
        initialValues={initialValues}
        validationSchema={loginSchema}
      >
        <Form className="w-100 p-4 rounded shadow-2xl bg-white border flex flex-col gap-3">
          <h1>Welcome Back, Please Login</h1>
          <Field
            name="email"
            className="input w-full"
            placeholder="Please Enter your email"
          />
          <ErrorMessage name="email" className="text-red-500" component="p" />
          <Field
            name="password"
            className="input w-full"
            placeholder="Please Enter your password"
          />
          <ErrorMessage
            name="password"
            className="text-red-500"
            component="p"
          />
          <button className="btn btn-primary w-full" type="submit">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}
