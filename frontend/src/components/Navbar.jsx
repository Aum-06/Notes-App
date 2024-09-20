import React, { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchbBar from "./SearchbBar";
import api from "../utils/api";

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
            
              <ProfileInfo  userName={user?.fullName}onLogout={onLogout} />
            
          </>
        ) : (
          " "
        )}
      </div>
    </>
  );
};

export default Navbar;
