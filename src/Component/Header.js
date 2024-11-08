import React from "react";
import { ibeorlogo } from "../Utils/Logo";
import { useNavigate } from "react-router-dom";
import { Loginheader } from "models/GlobalComponentsStyle";
import PropTypes from "prop-types";

export default function Header({ type }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (type === "forgetPassword") {
      navigate("/");
    } else {
      window.location.reload();
    }
  };

  return (
    <Loginheader>
      <button
        onClick={handleClick}
        style={{ border: "none", background: "none", padding: 0 }}
      >
        <img
          className="loginlogo"
          src={ibeorlogo}
          alt=""
          style={{
            height: "63px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        />
      </button>
    </Loginheader>
  );
}

Header.propTypes = {
  type: PropTypes.string,
};
