import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useGlobalData } from "../Global"; // Import global context
import "../App.css";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const { userData } = useGlobalData();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .order("xp", { ascending: false }); // Sort by XP in descending order

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data.slice(0, 10)); // Only store top 10 users
      }
    };

    fetchUsers();
  }, [userData]);

  return (
    <div className="usergradient rounded-3xl w-full  text-white p-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Leaderboard
      </h1>
      <div className="max-w-sm mx-auto">
        <div className="grid grid-cols-3 gap-4 p-4 bg-transparent rounded-lg shadow-lg">
          <div className="text-lg font-semibold text-purple-400">Rank</div>
          <div className="text-lg font-semibold text-purple-400">Username</div>
          <div className="text-lg text-right font-semibold text-purple-400">
            XP
          </div>
        </div>

        {/* Scrollable leaderboard container with hidden scrollbar */}
        <div className="h-64 overflow-y-auto no-scrollbar">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`grid grid-cols-3 gap-4 p-4 rounded-lg shadow-lg mt-2 transition-all duration-300 
              ${
                user.id === userData.id
                  ? "bg-purple-600 text-white font-bold"
                  : "bg-gray-800 hover:bg-gray-700"
              }
            `}
            >
              <div className="text-lg font-medium">{`#${index + 1}`}</div>
              <div className="text-lg font-medium">{`${user.name} ${user.surname}`}</div>
              <div className="text-lg font-medium text-right">{user.xp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
