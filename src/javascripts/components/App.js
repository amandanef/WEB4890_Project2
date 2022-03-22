import React from "react";
import GameList from "./GameList";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";

export default function Main() {
  return (
    <Router>
      <div className="container">
        <header>
          <div>
            <Link to="/home" className="title">
              <FaGamepad
                size={90}
                className="color-primary game-icon"
              ></FaGamepad>
              <div className="title">
                <h1>Video Game Tracker</h1>
                <h3>WEB 4890 Project 2</h3>
              </div>
            </Link>
          </div>
        </header>
        <GameList />
        <footer>&copy; Amanda Nef 2022</footer>
      </div>
    </Router>
  );
}
