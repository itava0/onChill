import React from "react";
import moviedbLogo from "../img/moviedb.png";

const SideBar = ({ items, onItemSelect, selectedItem }) => {
  return (
    <nav className="sidebar">
      <ul className="side-nav">
        {items.map(item => (
          <li
            key={item.id}
            className={
              item === selectedItem
                ? "side-nav__item side-nav__item--active"
                : "side-nav__item"
            }
            onClick={() => onItemSelect(item)}
          >
            <a className="side-nav__link">{item.name}</a>
          </li>
        ))}
      </ul>
      <div className="footer">
        <a
          href="https://www.themoviedb.org/"
          target="_blanck"
          className="footer__logo"
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
          All rights reserved. View project on{" "}
          <a
            href="https://github.com/itava0/onChill"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            GitHub.
          </a>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
