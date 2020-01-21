import React from "react";
import moviedbLogo from "../img/moviedb.png";

const PhoneFooter = () => {
  return (
    <footer className="phone-footer">
      <a
        href="https://www.themoviedb.org/"
        target="_blanck"
        className="footer__logo footer__logo--phone"
      >
        <img
          src={moviedbLogo}
          alt="Powered by the movie database"
          className="footer__logo-img"
        />
      </a>
      <div className="legal">
        &copy; 2020 by{" "}
        <a
          href="https://itavarez.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          Igor Tavarez.
        </a>{" "}
        All rights reserved. View on{" "}
        <a
          href="https://github.com/itava0/onChill"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          GitHub.
        </a>
      </div>
    </footer>
  );
};

export default PhoneFooter;
