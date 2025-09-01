import React, { useState } from "react";
import { requestOtp } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginOtp = async () => {
    try {
      if (!email) return setError("Email is required");
      await requestOtp(email);
      navigate("/verify-otp", { state: { email } });
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleLoginOtp}>Login with OTP</button>
    </div>
  );
};

export default Login;
