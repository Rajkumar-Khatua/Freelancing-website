import React from "react";
import "./single.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import StarRateIcon from "@mui/icons-material/StarRate";
import Slider from "infinite-react-carousel";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useQuery } from "react-query";
import { format } from "timeago.js";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import newRequest from "../../utils/newRequest";
import { Link, useLocation, useParams } from "react-router-dom";
import Review from "../../components/Reviews/Reviews";
import { Alert, CircularProgress, LinearProgress } from "@mui/material";

function single() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  const location = useLocation();
  console.log(data);

  console.log(dataUser);
  return (
    <div className="single">
      {isLoading ? (
        <CircularProgress color="success" />
      ) : error ? (
        <Alert variant="outlined" severity="error">
          This is an error alert — check it out!
        </Alert>
      ) : (
        <div className="container">
          <div className="left">
            <span className="braedCums">
              Graphics & Design <KeyboardArrowRightIcon /> AI Artists
            </span>
            <h1 className="title">{data.title}</h1>
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              "Something is wrong"
            ) : (
              <div className="userInfo">
                <img
                  src={dataUser.img || "../../../public/img/noProfilePic.jpg"}
                  alt=""
                  className="userImg"
                />
                <span className="userName">{dataUser.username}</span>
                ||
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <StarRateIcon className="rating" key={i} />
                      ))}
                    <span className="ratingCount">
                      {Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img src={img} key={img} alt="image not available" />
              ))}
            </Slider>

            <h2>About this gig</h2>
            <p>{data.desc}</p>

            {isLoadingUser ? (
              <CircularProgress color="success" />
            ) : errorUser ? (
              "Something is wrong"
            ) : (
              <div className="sellerInfo">
                <h2>About the seller</h2>

                <div className="user">
                  <img
                    src={dataUser.img || "../../../public/img/noProfilePic.jpg"}
                    alt=""
                    className="userImg"
                  />

                  <div className="userProfile">
                    <span className="userName">{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <StarRateIcon className="rating" key={i} />
                          ))}
                        <span className="ratingCount">
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button className="button">
                  Contact Me <ConnectWithoutContactIcon />
                </button>
              </div>
            )}

            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              "Something is wrong"
            ) : (
              <div className="userInfoBox">
                <div className="datas">
                  <div className="data">
                    <span className="title">From</span>
                    <span className="desc">{dataUser.country}</span>
                  </div>
                  <div className="data">
                    <span className="title">Member since</span>
                    <span className="desc">{format(dataUser.createdAt)}</span>
                  </div>
                  <div className="data">
                    <span className="title">Avg. Response time</span>
                    <span className="desc">1 hour ago</span>
                  </div>
                  <div className="data">
                    <span className="title">Last Delivery</span>
                    <span className="desc">about 14 hours</span>
                  </div>
                  <div className="data">
                    <span className="title">Languages</span>
                    <span className="desc">
                      English, Italian, German, French
                    </span>
                  </div>
                </div>
                <hr />
                <p>
                  {/* {dataUser.into} ||  */}
                  {dataUser.desc}
                </p>
              </div>
            )}
            <Review gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>₹{data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="data">
                <>
                  <QueryBuilderOutlinedIcon />
                  <span>{data.deliveryTime} Days Delivery</span>
                </>
                <>
                  <DataUsageIcon />
                  <span>{data.revisionNumber} Revision</span>
                </>
              </div>
            </div>
            <div className="featuresDetails">
              {data.features.map((feature) => (
                <div className="feature" key={feature}>
                  <CheckRoundedIcon className="checkIcon" />
                  <span>feature</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button className="btn link">
                Continue <ArrowForwardRoundedIcon />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default single;
