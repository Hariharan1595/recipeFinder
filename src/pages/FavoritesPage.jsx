import React from "react";
import RecipeCard from "../components/RecipeCard";

const FavoritesPage = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favorites);
  return (
    <div className="p-10 flex-1 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-3xl md:text-5xl my-4">My Favorites</p>

        {favorites.length === 0 && (
          <div className="flex flex-col items-center gap-4 h-[80vh]">
            <img src="/404.svg" alt="404" className="h-3/4" />
          </div>
        )}
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {favorites.map((recipe)=>(
            <RecipeCard key={recipe.label} recipe={recipe}/>
           ))}
          </div>
      
      </div>
    </div>
  );
};

export default FavoritesPage;
