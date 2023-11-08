import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://freelancing-website-ten.vercel.app/api/",
  withCredentials: true,
});


export default newRequest;