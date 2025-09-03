import React, { useContext, useState } from "react";
import { requestOtp, verifyOtp } from "../../services/authService";
import rightColumn from "../../assets/rightColumn.svg";
import logo from "../../assets/logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleRequestOtp = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    } else if (!emailRegex.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setOtpSent(true);

    try {
      await requestOtp(email.trim());
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await requestOtp(email.trim());
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to resend OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const data = await verifyOtp({ email, otp });
      auth?.login(data.token, data.user);
      navigate("/notes");
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100">
      <div className="flex flex-col w-full md:w-[591px] h-auto md:h-[1024px] p-6 md:p-8 gap-8">
        <div className="flex justify-center md:justify-start items-center md:gap-3 h-8 w-full md:mb-0">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex flex-col justify-center flex-1 w-full md:w-[527px] gap-5 md:px-16">
          <div className="text-center md:text-left gap-3">
            <h2 className="text-3xl font-bold font-sans">Sign in</h2>
            <p className="text-gray-500 font-normal font-sans">
              Login to access your notes
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent}
                className={`w-full h-[52px] px-4 text-gray-700 bg-white border rounded-lg outline-none peer focus:ring-1
                ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } md:h-[59px]`}
              />
              <label
                htmlFor="email"
                className="absolute left-4 px-1 text-gray-500 bg-white transform -translate-y-1/2 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:-translate-y-1/2
                         peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-4 peer-focus:-translate-y-1/2
                         peer-focus:text-sm peer-focus:text-blue-500"
              >
                Email
              </label>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!otpSent ? (
              <button
                onClick={handleRequestOtp}
                className="w-full bg-custom-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get OTP
              </button>
            ) : (
              <>
                <div className="relative">
                  <input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full h-[52px] px-4 text-gray-700 bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500 md:h-[59px]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 text-sm hover:underline self-start"
                >
                  Resend OTP
                </button>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Keep me logged in
                </label>

                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-custom-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
          {otpSent && (
            <h1 className="text-custom-blue font-semibold font-sans">
              Otp sent successfully if not wait 15 sec!!
            </h1>
          )}
          <p className="text-sm text-center font-sans font-normal text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-custom-blue hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
      <div
        className="hidden md:flex items-center justify-center"
        style={{
          width: "849px",
          height: "1024px",
          padding: "12px",
          gap: "10px",
          borderRadius: "24px",
        }}
      >
        <img src={rightColumn} alt="rightImage" />
      </div>
    </div>
  );
};

export default Login;
