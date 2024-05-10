// 1. Import React
import React, { useState } from "react";

// 2. y 5. create your first component and export it
export const Navbar = () => {

	return (
		<div className="container-fluid">
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand display-1" href="#"><i className="far fa-sticky-note"></i> Tasker!</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
        <a className="nav-link" href="#">Login</a>
        <a className="nav-link" href="#">Pricing</a>
      </div>
    </div>
  </div>
</nav>
		</div>
	);
};
