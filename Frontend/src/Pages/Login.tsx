import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";
import { ShowErrorToast, ShowSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    console.log("result on login page ", result);
    if (loginUser.fulfilled.match(result)) {
      ShowSuccessToast("Login successful");
      navigate("/");
    }

    if (loginUser.rejected.match(result)) {
      ShowErrorToast(result.payload as string);
    }
  };

  return (
    <div className="w-full max-w-md justify-center container mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
      <p className="text-center text-gray-500 mb-8">
        Sign in to your account to continue
      </p>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium">Email address</label>
          <input
            type="email"
            className="mt-1 w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <button className="text-green-500 hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don’t have an account?{" "}
        <a href="/signup" className="text-green-500 font-medium">
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Login;
