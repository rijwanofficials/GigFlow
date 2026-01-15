import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { sendOtp, signupUser, clearError } from "../redux/authSlice";
import { ShowErrorToast, ShowSuccessToast } from "../utils/toast";

function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  /* STEP 1: SEND OTP */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    const result = await dispatch(sendOtp(email));
    console.log("Result of otp response ", result);

    if (sendOtp.fulfilled.match(result)) {
      ShowSuccessToast("OTP sent to your email");
      setStep(2);
    }

    if (sendOtp.rejected.match(result)) {
      ShowErrorToast(result.payload as string);
    }
  };

  /* STEP 2: REGISTER */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(signupUser({ email, otp, name, password }));

    if (signupUser.fulfilled.match(result)) {
      ShowSuccessToast("Account created successfully");
    }

    if (signupUser.rejected.match(result)) {
      ShowErrorToast(result.payload as string);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Create your account
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Join GigFlow and start hiring or getting hired
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="text-sm font-medium">OTP</label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mt-1 w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Full name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="mt-1 w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="mt-1 w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
            >
              Create account
            </button>

            <button
              type="button"
              onClick={() => {
                dispatch(clearError());
                setStep(1);
              }}
              className="w-full text-sm text-green-500 hover:underline"
            >
              Change email
            </button>
          </form>
        )}

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
