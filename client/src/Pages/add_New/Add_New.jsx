import { useReducer, useState } from "react";
import "./add.scss";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/cloudenaryUpload/upload.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import newRequest from "../../utils/newRequest";
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function add_New() {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  console.log(state);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs/", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const isFormValid = () => {
    return (
      state.title &&
      state.cat !== "select" &&
      state.desc &&
      state.shortTitle &&
      state.shortDesc &&
      state.deliveryTime > 0 &&
      state.revisionNumber > 0 &&
      state.features.length > 0 &&
      state.price > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill in all the required fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true); // Set loading state
      toast.success("Gig created successfully!", {
        autoClose: 3000,
        position: "top-right",
      });
      await mutation.mutateAsync(state); // Use mutateAsync to await the result
      setIsSubmitting(false); // Reset loading state
      dispatch({ type: "CLEAR_FORM" }); // Clear the form fields
      navigate("/mygigs");
    } catch (error) {
      toast.error("Failed to create gig. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1 className="title">Add a new Product</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="e.g I'll Do whatever you want!"
              onChange={handleChange}
              required
            />
            <label htmlFor="cat">Category</label>
            <select name="cat" id="cat" onChange={handleChange} required>
              <option value="select">Select</option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="software">Software Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="painting">Painting</option>
              <option value="illustration">Illustration</option>
              <option value="graphics & design">Graphics & Design</option>
              <option value="writing and translating">
                Writing and translating
              </option>
              <option value="ai services">AI services</option>
              <option value="digital marketing">Digital marketing</option>
              <option value="Programming and tech">Programming and tech</option>
              <option value="Business Lifestyle">Business Lifestyle </option>
            </select>

            <div className="images">
              <h2>Images section</h2>
              <div className="imgagesInput">
                <label htmlFor="coverImage">Cover Image</label>
                <input
                  type="file"
                  id="coverImage"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                  required
                />
                <label htmlFor="uploadImages">"Upload" Images</label>
                <input
                  type="file"
                  id="uploadImages"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  required
                />
              </div>
              <button onClick={handleUpload} className="upload-btn">
                {uploading ? (
                  <CircularProgress size={20} thickness={2} color="inherit" />
                ) : (
                  "Upload"
                )}{" "}
                <CloudUploadIcon />
              </button>
            </div>
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              cols="30"
              rows="4"
              name="desc"
              placeholder="Brief introduction about your service"
              onChange={handleChange}
              required
            ></textarea>
            <button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <CircularProgress size={20} thickness={2} color="inherit" />
              ) : (
                "Create"
              )}
              <CallMadeIcon fontSize="small" />
            </button>
          </div>
          <div className="right">
            <label htmlFor="shortTitle">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              id="shortTitle"
              placeholder="e.g Single Page Web Site"
              onChange={handleChange}
              required
            />
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              id="shortDesc"
              cols="30"
              rows="10"
              name="shortDesc"
              placeholder="Short Description about your Service"
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="deliveryTime">Delivery Time (e.g. 5 days)</label>
            <input
              type="number"
              id="deliveryTime"
              min={1}
              name="deliveryTime"
              onChange={handleChange}
              required
            />
            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              type="number"
              id="revisionNumber"
              min={1}
              name="revisionNumber"
              onChange={handleChange}
              required
            />
            <label htmlFor="feature">Add Features</label>
            <form action="" className="addForm" onSubmit={handleFeature}>
              <input
                type="text"
                id="feature"
                placeholder="Setting Domain and hosting"
                onChange={handleChange}
                required
              />
              <button className="upload-btn" type="submit">
                add <AddCircleIcon />
              </button>
            </form>
            <div className="addedFeature">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    className="cancel"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="e.g. $50"
              name="price"
              onChange={handleChange}
              required
            />
            <label htmlFor="discount">Discount</label>
            <input
              type="number"
              id="discount"
              name="discount"
              placeholder="e.g. $50"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default add_New;
