import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { starLogout } from "../../actions/auth";

const Navbar = () => {
  const { name } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(starLogout());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  );
};

export default Navbar;