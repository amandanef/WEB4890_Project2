import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";

import { GameContext } from "./GameList";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

toast.configure();

export function StarRating({ stars, totalStars = 5 }) {
  const Star = ({ selected = false, onSelect = (f) => f }) => (
    <FaStar color={selected ? "#065064" : "grey"} onClick={onSelect} />
  );
  const createArray = (length) => [...Array(length)];

  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <>
      {createArray(totalStars).map((g, i) => (
        <Star
          key={i}
          selected={stars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p className="starRatio">
        <strong>{stars}</strong> of {totalStars} stars
      </p>
    </>
  );
}

export function VHelp({ message }) {
  return <p className="help">{message}</p>;
}

const validationSchema = yup.object({
  year: yup.number().required().min(1950).max(new Date().getFullYear()),
  rating: yup.number().required().min(0).max(5),
  title: yup.string().required(),
  image: yup.string().url().required(),
  console: yup.string().required(),
  developer: yup.string().required(),
});

export default function GameForm() {
  let { games, setGames } = useContext(GameContext);
  let { gid } = useParams();

  let game = gid ? games.find((g) => g.id == gid) : {};
  let is_new = gid === undefined;
  let { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik(
    {
      initialValues: is_new
        ? {
            year: new Date().getFullYear(),
            title: "",
            image: "",
            console: "",
            developer: "",
            rating: "",
          }
        : { ...game },
      validationSchema,
      onSubmit(values) {
        if (is_new) {
          let id = games.length;
          while (true) {
            let vg = games.find((g) => g.id == id++);
            if (vg === undefined) break;
          }

          values.id = id;
          games.push(values);
        } else {
          let vg = games.find((g) => g.id == game.id);
          Object.assign(vg, values);
        }
        setGames([...games]);
        history.push("/games");
        toast(`Successfully ${is_new ? "added" : "edited"}`);
      },
    }
  );

  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <h1>Adding/Editing a Video Game</h1>

      <div className="field">
        <label htmlFor="title">Title</label>
        <div className="control">
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <VHelp message={errors.title} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="year">Year Released</label>
        <div className="control">
          <input
            type="text"
            name="year"
            value={values.year}
            onChange={handleChange}
          />
          <VHelp message={errors.year} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="image">Image</label>
        <div className="control">
          <input
            type="url"
            name="image"
            value={values.image}
            onChange={handleChange}
          />
          <VHelp message={errors.image} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="developer">Developer(s)</label>
        <div className="control">
          <input
            type="text"
            name="developer"
            value={values.developer}
            onChange={handleChange}
          />
          <VHelp message={errors.developer} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="console">Console(s)</label>
        <div className="control">
          <input
            type="text"
            name="console"
            value={values.console}
            onChange={handleChange}
          />
          <VHelp message={errors.console} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="rating">Rating</label>
        <div className="control">
          <input
            type="number"
            name="rating"
            value={values.rating}
            onChange={handleChange}
            className="value-form"
          />
          <VHelp message={errors.rating} />
          <StarRating stars={values.rating}></StarRating>
        </div>
      </div>

      <div className="field">
        <label></label>
        <div className="control">
          <button className="primary">Submit</button>
          <button className="primary" onClick={() => history.push("/games")}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
