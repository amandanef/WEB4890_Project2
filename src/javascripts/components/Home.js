import React from "react";
import { useHistory } from "react-router-dom";

export function Home() {
  const history = useHistory();

  return (
    <>
      <div className="container">
        <h2 className="welcome-title">Welcome!</h2>
        <p>
          The purpose of this simple application is to help you track what video
          games you have played and are worth noting. Not only does this app
          allow you to keep a gallery of your games, it also allows you to keep
          track of developers, consoles you played the game on, and your
          personal rating of the game! Add a new game or view the full gallery
          to get started.
        </p>
        <button
          className="primary gallery-button"
          onClick={() => history.push("/games")}
        >
          View Video Game Gallery
        </button>
      </div>
    </>
  );
}
