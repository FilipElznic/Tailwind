import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useGlobalData } from "../Global"; // Import global context

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const { userData } = useGlobalData();
  const [userRank, setUserRank] = useState(null);
  const [isUserInTop10, setIsUserInTop10] = useState(false);

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

        // Find the current user's rank in the full list
        const rank = data.findIndex((user) => user.id === userData.id);
        if (rank !== -1) {
          setUserRank(rank + 1); // Ranks start from 1
          setIsUserInTop10(rank < 10); // Check if the user is in the top 10
        }
      }
    };

    fetchUsers();
  }, [userData.id]);

  return (
    <div className="min-h-screen bg-transparent text-white p-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Leaderboard
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
          <div className="text-lg font-semibold text-purple-400">Rank</div>
          <div className="text-lg font-semibold text-purple-400">Username</div>
          <div className="text-lg font-semibold text-purple-400">XP</div>
        </div>
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
            <div className="text-lg font-medium">{user.xp}</div>
          </div>
        ))}
      </div>

      {userRank && !isUserInTop10 && (
        <div className="text-center mt-6 text-lg font-semibold text-gray-300">
          {`You are currently ranked #${userRank} (Outside Top 10)`}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
