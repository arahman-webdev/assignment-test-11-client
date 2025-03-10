import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import googleImg from "../../assets/images/google.png";
import Swal from "sweetalert2";

const Login = () => {
  const { user, loginUser, loginWithGoogle } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Welcome back! Sign-in successful",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage("Invalid email or password.");
      });
  };

  const handleSignInWithGoogle = () => {
    loginWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Welcome back! Google sign-in successful",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        setErrorMessage("Failed to sign in with Google.");
      });
  };

  return (
    <div>
      <div
        style={{ minHeight: "calc(100vh - 200px)" }}
        className="flex items-center"
      >
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center justify-center w-full relative border">
          <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
            Login
          </h1>
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="email"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Email:
              </label>
              <input
                type="email"
                placeholder="email"
                id="email"
                name="email"
                required
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                id="password"
                name="password"
                required
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <label className="label">
                <Link
                  to="/auth/forgot-password"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
            >
              Login
            </button>
          </form>
          <div className="absolute top-52 right-10">
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-red-500">
                Register now
              </Link>
            </p>
          </div>
          <div className="divider">OR</div>
          <div
            onClick={handleSignInWithGoogle}
            className="flex gap-2 cursor-pointer border px-5 py-3 rounded-md hover:bg-base-200 transition duration-200"
          >
            <img className="w-7 h-7" src={googleImg} alt="" />
            <h1 className="">Login With Google</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
