import api from "./api";

export const requestOtp = async (email: string) => {
    const res = await api.post("/auth/request-otp", { email });
    console.log(res);
  return res.data;
};

export const verifyOtp = async (data: { email: string; otp: string; name?: string; dob?: string }) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data; 
};
