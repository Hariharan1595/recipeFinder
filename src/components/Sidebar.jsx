import { Heart, Home } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [clicked, setClicked] = useState("Home");
  return (
    <div>
      <DesktopSidebar clicked={clicked} setClicked={setClicked} />
      <MobileSidebar clicked={clicked} setClicked={setClicked} />
    </div>
  );
};

export default Sidebar;

const DesktopSidebar = ({ clicked, setClicked }) => {
  return (
    <div className="p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block ">
      <div className="flex flex-col gap-20 sticky top-10 left-0">
        <div className="w-full flex items-center gap-2">
          <img src="/stew.gif" alt="logo" className="size-10 hidden md:block" />
          <p className="text-xl md:text-2xl font-bold text-blue-400">Yumify</p>
        </div>
        <ul className="flex flex-col gap-8 items-center md:items-start">
          <Link to={"/"} className="flex items-center gap-2">
            <Home
              className={`${
                clicked === "Home" ? "text-orange-500 fill-orange-500" : ""
              }`}
            />
            <span
              className="font-bold hidden md:block"
              onClick={() => setClicked("Home")}
            >
              Home
            </span>
          </Link>
          <Link to={"/favorites"} className="flex items-center gap-2">
            <Heart
              className={`${
                clicked === "Heart" ? "text-orange-500 fill-orange-500" : ""
              }`}
            />
            <span
              className="font-bold hidden md:block"
              onClick={() => setClicked("Heart")}
            >
              Favorites
            </span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

const MobileSidebar = ({ clicked, setClicked }) => {
  return (
    <div
      className="w-screen  flex gap-8 p-4 justify-center z-10 
    border-t border-gray-400 bg-slate-100 bottom-0 left-0 fixed sm:hidden"
    >
      <Link to={"/"}>
        <Home
          onClick={() => setClicked("Home")}
          className={`${
            clicked === "Home" ? "text-orange-500 fill-orange-500" : ""
          }`}
        />
      </Link>
      <Link to={"/favorites"}>
        <Heart
          onClick={() => setClicked("Heart")}
          className={`${
            clicked === "Heart" ? "text-orange-500 fill-orange-500" : ""
          }`}
        />
      </Link>
    </div>
  );
};
