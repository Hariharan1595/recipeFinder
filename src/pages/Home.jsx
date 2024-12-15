import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const APP_ID = import.meta.env.VITE_APP_ID;
  const API_KEY = import.meta.env.VITE_APP_KEY;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (query) => {
    try {
      setLoading(true);
      setRecipes([]);
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${API_KEY}&q=${query}&type=public`,
        {
          method: "GET",
          headers: {
            "Edamam-Account-User": APP_ID,
          },
        }
      );

      const data = await response.json();
      // console.log(data);
      setRecipes(data.hits);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  };

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);
  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What are you looking for today?"
            />
          </label>
        </form>
        <h1 className="font-bold text-3xl md:text-4xl mt-4">Recommended</h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Trending recipes
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!loading && recipes.map(({recipe},index)=>(
            <RecipeCard recipe={recipe} key={index}/>
          ))}
          
          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex w-full flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-24"></div>
                </div>
               
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
