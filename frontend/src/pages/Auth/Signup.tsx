import React, { useContext, useState } from "react";
import { requestOtp, verifyOtp } from "../../services/authService";
import rightColumn from "../../assets/rightColumn.svg";
import logo from "../../assets/logo.svg";
import CustomDatePicker from "./CustomDatePicker";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const nameRegex = /^[A-Za-z][A-Za-z\s.'-]{1,}$/;

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    dob?: string;
    email?: string;
  }>({});

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const parseDob = (s: string) => {
    const t = Date.parse(s);
    return isNaN(t) ? null : new Date(t);
  };

  const validateForm = () => {
    const next: typeof fieldErrors = {};

    if (!name.trim()) {
      next.name = "Name is required";
    } else if (!nameRegex.test(name.trim())) {
      next.name = "Enter a valid name";
    } else if (name.trim().length < 2) {
      next.name = "Name must be at least 2 characters";
    }

    if (!dob.trim()) {
      next.dob = "Date of birth is required";
    } else {
      const d = parseDob(dob.trim());
      if (!d) next.dob = "Enter a valid date";
      else {
        const today = new Date();
        if (d > today) next.dob = "Date cannot be in the future";
      }
    }

    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      next.email = "Enter a valid email address";
    }

    return next;
  };

  const handleRequestOtp = async () => {
    const errs = validateForm();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setError("");
    setOtpSent(true);

    try {
      await requestOtp(email.trim());
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const data = await verifyOtp({ email, otp, name, dob });
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
            <h2 className="text-3xl font-bold font-sans">Sign up</h2>
            <p className="text-gray-500 font-normal font-sans">
              Sign up to enjoy the feature of HD
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="relative">
              <input
                id="name"
                type="text"
                placeholder=" "
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name)
                    setFieldErrors((p) => ({ ...p, name: undefined }));
                }}
                aria-invalid={!!fieldErrors.name}
                className={`w-full h-[52px] px-4 text-gray-700 bg-white border rounded-lg outline-none peer focus:ring-1
                ${
                  fieldErrors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } md:h-[59px]`}
              />
              <label
                htmlFor="name"
                className="absolute left-4 text-gray-500 bg-white transform -translate-y-1/2 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:-translate-y-1/2
                         peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-4 peer-focus:-translate-y-1/2
                         peer-focus:text-sm peer-focus:text-blue-500"
              >
                Your Name
              </label>
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
              )}
            </div>
            <div className="relative w-full">
              <CustomDatePicker
                label="Date of Birth"
                onDateChange={(formattedDate) => {
                  setDob(formattedDate);
                  if (fieldErrors.dob)
                    setFieldErrors((p) => ({ ...p, dob: undefined }));
                }}
              />
              {fieldErrors.dob && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.dob}</p>
              )}
            </div>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email)
                    setFieldErrors((p) => ({ ...p, email: undefined }));
                }}
                aria-invalid={!!fieldErrors.email}
                className={`w-full h-[52px] px-4 text-gray-700 bg-white border rounded-lg outline-none peer focus:ring-1
                ${
                  fieldErrors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } md:h-[59px]`}
              />
              <label
                htmlFor="email"
                className="absolute left-4 text-gray-500 bg-white transform -translate-y-1/2 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:-translate-y-1/2
                         peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-4 peer-focus:-translate-y-1/2
                         peer-focus:text-sm peer-focus:text-blue-500"
              >
                Email
              </label>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {otpSent ? (
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
                  onClick={handleVerifyOtp}
                  className="w-full bg-custom-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Sign up
                </button>
              </>
            ) : (
              <button
                onClick={handleRequestOtp}
                // disabled={Object.keys(fieldErrors).length > 0}
                className="w-full bg-custom-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get OTP
              </button>
            )}
          </div>
          {otpSent && (
            <h1 className="text-custom-blue font-semibold font-sans">
              OTP sent successfully! If not received, please wait 15 sec.
            </h1>
          )}
          <p className="text-sm text-center font-sans font-normal text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-custom-blue hover:underline">
              Sign in
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

export default Signup;
