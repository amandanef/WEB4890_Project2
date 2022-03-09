import React, { useState, createContext } from "react";
import Game from "./Game";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { ErrorNotFound } from "./Pages";
import GameForm from "./GameForm";
import { videogames } from "../videogames";
import { Home } from "./Home";

let sorting = false;

export const GameContext = createContext();
export default function GameList() {
  const [games, setGames] = useState(videogames);
  const history = useHistory();

  if (!games) return <p>Loading...</p>;

  return (
    <GameContext.Provider value={{ games, setGames }}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">List</Link>
          </li>
        </ul>
        <Route exact path="/games">
          <button
            className="primary"
            onClick={() => {
              if (sorting === false) {
                games.sort((a, b) => a.rating - b.rating);
                sorting = true;
              } else if (sorting === true) {
                games.sort((a, b) => b.rating - a.rating);
                sorting = false;
              }
              setGames(games.map((m) => m));
            }}
          >
            Sort
          </button>
        </Route>
        <button
          className="primary"
          onClick={() => {
            history.push("/games/new");
          }}
        >
          Add a game
        </button>
      </nav>
      <main>
        <Switch>
          <Route exact path="/games">
            {games.map((g, i) => {
              return <Game key={g.id} game={g} />;
            })}
          </Route>

          <Route path="/games/new">
            <GameForm />
          </Route>
          <Route path="/games/:gid/edit">
            <GameForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Redirect from="" to="/games" />
          <Route path="*">
            <ErrorNotFound />
          </Route>
        </Switch>
      </main>
    </GameContext.Provider>
  );
}
