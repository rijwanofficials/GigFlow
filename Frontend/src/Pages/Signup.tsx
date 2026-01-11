import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { sendOtp, signupUser, clearError } from "../redux/authSlice";
import { ShowErrorToast, ShowSuccessToast } from "../utils/toast";

function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  console.log(error);

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // STEP 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(clearError());
    const result = await dispatch(sendOtp(email));

    if (sendOtp.fulfilled.match(result)) {
      ShowSuccessToast("OTP sent successfully");
      setStep(2);
    }

    if (sendOtp.rejected.match(result)) {
      ShowErrorToast(result.payload as string);
    }
  };

  // STEP 2: Register
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
    <div className="min-h-screen flex items-center justify-center bg-blue-300 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-900">
          Create Account
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          Secure document workflow platform
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition disabled:opacity-60"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rijwan Hussain"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition disabled:opacity-60"
            >
              Register
            </button>

            <button
              type="button"
              onClick={() => {
                dispatch(clearError());
                setStep(1);
              }}
              className="w-full text-sm text-blue-700 hover:underline"
            >
              Change email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
