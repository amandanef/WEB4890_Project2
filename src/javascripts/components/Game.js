import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import { FaStar } from "react-icons/fa";
import { GameContext } from "./GameList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export function StarRating({ rating, totalStars = 5 }) {
  return [...Array(totalStars)].map((g, i) => (
    <FaStar
      size={30}
      key={i}
      color={i <= Math.floor(rating) - 1 ? "#065064" : "grey"}
    ></FaStar>
  ));
}

export default function Game(props) {
  let { games, setGames } = useContext(GameContext);
  let [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const g = props.game;
  const deleteGame = () => {
    for (let i in games) {
      if (games[i].id === g.id) {
        games.splice(+i, 1);
      }
    }
    setGames([...games]);
    setModalOpen(false);
    toast("Game successfully deleted");
    history.push("/games");
  };

  return (
    <>
      <div className="card">
        <div className="image-container">
          <img src={g.image} alt={g.title} />
        </div>
        <h2>{g.title}</h2>
        <p>Developer: {g.developer}</p>
        <p>Console Played On: {g.console}</p>
        <p>
          <strong>Year Released</strong>: {g.year}
        </p>
        <ul className="extra">
          <StarRating rating={g.rating}></StarRating>

          <li>
            <strong>{g.rating}</strong> rating
          </li>
        </ul>
        <div className="button-container">
          <button
            className="primary game-buttons"
            onClick={() => history.push(`/games/${g.id}/edit`)}
          >
            Edit
          </button>
          <button
            className="primary game-buttons"
            onClick={() => setModalOpen(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        contentLabel="Are you sure?"
      >
        <p>Are you sure you want to delete this game?</p>
        <button className="primary" onClick={deleteGame}>
          Confirm Delete
        </button>
        <button className="primary" onClick={() => setModalOpen(false)}>
          Cancel
        </button>
      </Modal>
    </>
  );
}
