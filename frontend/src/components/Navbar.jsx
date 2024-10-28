import React, { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchbBar from "./SearchbBar";
import api from "../utils/api";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Slices/themeSlice";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearch("");
  };

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await api.get("/user/get-user");
          console.log("User data fetched:", response.data); // Log the response

          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [token]);
  console.log("User state:", user); // Log the user state

  const onLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear user from context on logout

    navigate("/login");
  };
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center bg-white px-10 py-6 justify-between drop-shadow-md border-[1.5px]">
        <h1 className="text-3xl font-bold">Notes</h1>
        {token ? (
          <>
            <SearchbBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClearSearch={onClearSearch}
              handleSearch={handleSearch}
            />
               <div className="flex items-center gap-4 justify-between">

              <ProfileInfo  userName={user?.fullName}onLogout={onLogout} />
              <button onClick={() => dispatch(toggleTheme())} className="text-2xl">
            {darkMode ? (
              <MdLightMode className="toggle-theme dark:text-white size-10" />
            ) : (
              <MdDarkMode className="toggle-theme size-10" />
            )}
          </button>
               </div>
            
          </>
        ) : (
          " "
        )}
      </div>
    </>
  );
};

export default Navbar;
