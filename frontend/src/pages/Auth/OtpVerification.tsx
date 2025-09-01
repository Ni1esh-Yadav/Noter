import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const { email, name, dob } = (location.state as any) || {};

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
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleVerifyOtp}>Verify</button>
    </div>
  );
};

export default OtpVerification;
