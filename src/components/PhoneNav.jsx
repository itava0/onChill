import React, { useState } from "react";

const PhoneNav = props => {
  const [isClicked, setIsClicked] = useState(true);

  function handlerGenresNav() {
    let value;
    
    isClicked ? (value = false) : (value = true);
    
    setIsClicked(value)
  }

  return ( 
      <React.Fragment>
        {isClicked ? (
          <div
            className="phone-nav-container"
            onClick={() => handlerGenresNav()}
          >
            <p>Genres</p>
            <div style={{ fontSize: "2rem" }}>
              <i className="fa fa-caret-down" />
            </div>
          </div>
        ) : (
          <React.Fragment>
            <nav className="phone-nav">
              <ul className="phone-navigation">
                {props.items.map(item => (
                  <li
                    key={item.id}
                    className="phone-navigation__item"
                    onClick={() => props.onItemSelect(item)}
                  >
                    <a
                      className={
                        item === props.selectedItem
                          ? "phone-navigation__link phone-navigation__link--active"
                          : "phone-navigation__link"
                      }
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div
              className="phone-nav-container"
              onClick={() => handlerGenresNav()}
            >
              <p>Genres</p>
              <div style={{ fontSize: "2rem" }}>
                <i className="fa fa-caret-up" />
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
   );
}
 
export default PhoneNav;

