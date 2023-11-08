import React, { useEffect, useState } from "react";
import "./navbar.scss";
import LanguageIcon from "@mui/icons-material/Language";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

function navbar() {
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // navigate
  const navigate = useNavigate();

  // Logout
  const handleLogout = async () => {
    try {
      await newRequest.post("auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //User menu tootle
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    // if navbar is only navbar then when acitve class will add it i'll be navbar + active
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <div className="logo">
              <span className="CpLogo">Re-Seller</span>
              <span className="dot">•</span>
            </div>
          </Link>
        </div>
        <div className="middle">
          <div className="links">
            <div className="mobileHide">
              <span>Business</span>
              <span>Explore</span>
              <span className="lang">
                <LanguageIcon fontSize="small" />
                English
              </span>
            </div>
            <Link to="/register" className="link">
              {!currentUser?.isSeller && (
                <span className="mobile_seller_view">
                  Become a Seller <PersonAddAlt1Icon />
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="right">
          {!currentUser && (
            <Link to="/login" className="link">
              {" "}
              <span className="signIn">Sign in</span>
            </Link>
          )}
          {!currentUser && (
            <Link to="/register" className="link">
              {" "}
              <button className="join">Join</button>
            </Link>
          )}
          {currentUser && (
            // if menu is open then it will false other wise true!
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={currentUser.img || "../../../public/img/noProfilePic.jpg"}
                alt="user img"
                loading="lazy"
              />
              <span>{currentUser?.username}</span>
              {/* Open if  it is not open */}
              {/* if user is seller show Gigs and Add new  */}
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="link" to="/myGigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add new
                      </Link>
                    </>
                  )}
                  {/* if user is not seller is a customer show this below options  */}
                  <>
                    <Link className="link" to="/orders">
                      Orders
                    </Link>
                    <Link className="link" to="/messages">
                      Messages
                    </Link>
                    <Link className="link" to="/profile">
                      Profile
                    </Link>
                    <Link className="link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default navbar;
