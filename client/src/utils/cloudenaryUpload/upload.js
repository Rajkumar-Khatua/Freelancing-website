import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "resaleing");
  data.append("cloud_name", "dtwy8twom");
  // data.append("Content-Type", "application/json");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dtwy8twom/image/upload",
      data
    );
    const { url } = res.data;
    console.log(url)
    return url;
  } catch (error) {
    console.log(error);
  }
};
// console.log(data)
export default upload;
