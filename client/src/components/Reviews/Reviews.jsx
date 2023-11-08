import React from "react";
import "./review.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import LinearProgress from "@mui/material/LinearProgress";
import SingleReview from "../SingleReview/SingleReview";
import SendIcon from "@mui/icons-material/Send";
import { useMutation, useQuery, useQueryClient } from "react-query";
import newRequest from "../../utils/newRequest";

function Review({ gigId }) {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews/", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
  // console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;

    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? (
        <LinearProgress color="success" />
      ) : error ? (
        <Alert variant="outlined" severity="error">
          <AlertTitle>Error</AlertTitle>
          alert something went wrong— <strong>please try again...</strong>
        </Alert>
      ) : (
        data.map((review) => <SingleReview key={review._id} review={review} />)
      )}
      <div className="addReview">
        <h3 className="reviewTitle">
          Add a new review <RateReviewOutlinedIcon />
        </h3>
        <form action="" onSubmit={handleSubmit} className="addInput">
          
          <textarea name="" id="" cols="20" rows="2"  placeholder="Write your review!"
            className="reviewInput"></textarea>

          <div className="selected">
            <span>
              Rate by Star <StarPurple500OutlinedIcon className="star" />
            </span>
            <select name="" id="" placeholder="Rate by Star">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button className="link">
            Post <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Review;
