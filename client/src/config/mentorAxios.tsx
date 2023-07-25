import axios from "axios";
import { useSelector } from "react-redux";
import { mentorReducer } from "../Redux/mentorSlice/mentorSlice";
import { useEffect } from "react";

const useMentorAxios = () => {
  const mentor = useSelector(mentorReducer);

  useEffect(() => {
    MentorAxios.interceptors.request.use((config) => {
      const token = mentor.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, [mentor]);

  return MentorAxios;
};

const MentorAxios = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

export default useMentorAxios;
