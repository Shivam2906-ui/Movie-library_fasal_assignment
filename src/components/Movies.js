import React from "react";
import { useGlobalContext } from "../utils/context";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const Movies = () => {
  const { movie, isLoading } = useGlobalContext();
  const dispatch = useDispatch();

  const handleAddItem = (curMovie) => {
    //Dispatch an action
    dispatch(addItem(curMovie));
  };

  if (isLoading) {
    return (
      <div>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <section
      className="movie-page p-4 md:p-8 lg:p-12 mx-auto bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_small.jpg')",
      }}
    >
      <div className="flex flex-wrap justify-center">
        {movie.map((curMovie) => {
          const { imdbID, Title, Poster, Year } = curMovie;
          const movieName = Title.substring(0, 15);
          return (
            <NavLink to={`movie/${imdbID}`} key={imdbID}>
              <div className="card bg-slate-500 rounded-lg w-72 m-4 hover:bg-slate-400 shadow-red-600 shadow-2xl transition duration-100 transform hover:scale-105">
                <div className="card-info p-4">
                  <h2 className="text-center font-serif font-bold text-xl text-slate-100">
                    {movieName.length >= 15 ? `${movieName}... ` : movieName}
                  </h2>
                  <img
                    className="w-full h-64 md:h-72 lg:h-96 mx-auto py-2 rounded-2xl shadow-lg shadow-blue-700"
                    src={Poster}
                    alt={imdbID}
                    onClick={() => handleAddItem(curMovie)}
                  />
                  <h2 className="text-center font-serif font-bold text-xl text-blue-950">
                    {Year}
                  </h2>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Movies;
