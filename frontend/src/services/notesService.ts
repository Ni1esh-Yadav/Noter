import axios from "axios";

const API_URL = "http://localhost:5000/notes"; 

const authHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getNotes = async () => {
  const res = await axios.get(API_URL, authHeader());
  return res.data;
};

export const createNote = async (content: string) => {
  const res = await axios.post(API_URL, { content }, authHeader());
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, authHeader());
  return res.data;
};
