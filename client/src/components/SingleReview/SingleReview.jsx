import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import "./Singlereview.scss";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";
import { CircularProgress } from "@mui/material";
function SingleReview({ review }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);
  return (
    <>
      <div className="review">
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="outlined" severity="error">
            <AlertTitle>Error</AlertTitle>
            alert something went wrong— <strong>with user details please try again...</strong>
          </Alert>
        ) : (
          <div className="user">
            <div className="info">
            <img
              src={data.img || "/img/noProfilePic.jpg"}
              alt=""
              className="ProfilePic"
            />
              <span>{data.username}</span>
              <div className="country">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/125px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
                  alt=""
                  className="CImg"
                />
                <span>{data.country}</span>
              </div>
              
            </div>
            <MoreVertOutlinedIcon style={{float:"right"}}/>
          </div>
        )}
        <div className="stars">
          {Array(review.star)
            .fill()
            .map((item, i) => (
              <StarRateIcon className="rating" key={i} />
            ))}

          <span>({review.star})</span>
        </div>
        <p>{review.desc}</p>
        <div className="helpFull">
          <span>Helpful?</span>
          <ThumbUpOutlinedIcon />
          <span>Yes</span>
          <ThumbDownOffAltOutlinedIcon />
          <span>No</span>
        </div>
      </div>
      {/* <hr /> */}
    </>
  );
}

export default SingleReview;
