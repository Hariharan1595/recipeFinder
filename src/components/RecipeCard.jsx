import { Heart, HeartPulse, Soup } from "lucide-react";
import React, { useState } from "react";

const getTwoValueFromArray = (arr) => {
  return [arr[0], arr[1]];
};
const RecipeCard = ({ recipe }) => {
  const healthLabels = getTwoValueFromArray(recipe.healthLabels);
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const recipeExists = favorites.some((f) => f.label === recipe.label);

    if (recipeExists) {
      favorites = favorites.filter((f) => f.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div
      className="flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden
     p-3 relative"
    >
      <a
        href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
        target="_blank"
        className="relative h-32"
      >
        <div className="skeleton absolute inset-0" />
        <img
          src={recipe.image}
          alt="recipe"
          className="size-full rounded-md object-cover cursor-pointer opacity-0 transition-opacity
           duration-500"
           onLoad={(e) => {
            e.currentTarget.style.opacity = 1
            e.currentTarget.previousElementSibling.style.display = 'none'
           }}
        />
        <div
          className="absolute bottom-2 left-2 bg-white rounded-full
             p-1 cursor-pointer flex items-center gap-1 text-sm"
        >
          <Soup /> {recipe.yield} Servings
        </div>
        <div
          className="absolute top-1 right-2 bg-white
             rounded-full p-1 cursor-pointer "
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavorites();
          }}
        >
          {!isFavorite && (
            <Heart className="hover:text-red-500 hover:fill-red-50" />
          )}
          {isFavorite && <Heart className="text-red-500 fill-red-500" />}
        </div>
      </a>
      <div className="flex mt-1">
        <p className="font-bold tracking-wide">{recipe.label}</p>
      </div>
      <p className="my-2">
        {recipe.cuisineType[0].charAt(0).toUpperCase() +
          recipe.cuisineType[0].slice(1)}{" "}
        Kitchen
      </p>

      <div className="flex gap-2 mt-auto">
        {healthLabels.map((label, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 bg-[#d6f497] p-1 rounded-md"
          >
            <HeartPulse />
            <span className="text-sm tracking-tighter font-semibold">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
