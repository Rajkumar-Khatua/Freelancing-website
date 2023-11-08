import React, { useEffect, useRef, useState } from "react";
import "./categories.scss";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import { gigs } from "../../data";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import GigCard from "../../components/GigCard/GigCard";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function categories() {
  const [sort, setSort] = useState("sales");
  const [show, setShow] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const reSort = (type) => {
    setSort(type);
    setShow(false);
  };

  const { search } = useLocation();
  // console.log(search)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  // sort by duration
  useEffect(() => {
    refetch();
  }, [sort]);
  const apply = () => {
    refetch();
  };

  return (
    <div className="categories">
      <div className="container">
        <span className="breadcrumbs">Graphics & Design</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with ReSale's AI artists
        </p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="SortBy">Sort By: </span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <ArrowDropDownIcon
              onClick={() => setShow(!show)}
              style={{ cursor: "pointer" }}
            />
            {show && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            <CircularProgress className="progress" />
          ) : //  <LinearProgress color="secondary" className="progress"/>
          error ? (
            <Alert variant="outlined" severity="error">
              Something went wrong — <strong>Field to fetch data!</strong>
            </Alert>
          ) : (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default categories;
