import React from "react";
import "./gigCard.scss";
import { Link } from "react-router-dom";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import newRequest from "../../utils/newRequest";

function gigCard({ item }) {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [`{${item.userId}}`],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/single/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="title img" />
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="user">
            <img src={data.img || "/img/noProfilePic.jpg"} alt="" />
            <span>{data.username}</span>
          </div>
        )}
        <span className="title">{item.title}</span>
        <div className="texts">{item.desc}</div>
        <div className="priceSection">
          <div className="pSection">
            <StarPurple500OutlinedIcon style={{ color: "gold" }} />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
          <span className="price">From: ₹{item.price}</span>
        </div>
      </div>
    </Link>
  );
}

export default gigCard;
