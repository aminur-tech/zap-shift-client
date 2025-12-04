import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
  baseURL: "https://zab-shift-server.vercel.app",
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
