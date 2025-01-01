import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function AdminPage() {
  const [authUser, setAuthUser] = useState(null); // Authenticated user
  const [isAdmin, setIsAdmin] = useState(null); // Admin status
  const [users, setUsers] = useState([]); // All users list
  const [showUsers, setShowUsers] = useState(false); // Toggle user visibility

  // Fetch authenticated user details
  useEffect(() => {
    async function fetchAuthUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else if (session) {
        setAuthUser(session.user); // Set the authenticated user in state
      }
    }

    fetchAuthUser();
  }, []);

  // Fetch admin status from the database
  useEffect(() => {
    async function fetchAdminStatus() {
      if (authUser) {
        const { data, error } = await supabase
          .from("user")
          .select("admin")
          .eq("authid", authUser.id);

        if (error) {
          console.error("Error fetching admin status:", error);
        } else if (data && data.length > 0) {
          setIsAdmin(data[0].admin);
        }
      }
    }

    fetchAdminStatus();
  }, [authUser]);

  // Fetch all users
  const fetchAllUsers = async () => {
    if (!showUsers) {
      const { data, error } = await supabase.from("user").select("*");

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data); // Set the users in state
      }
    }
    setShowUsers((prev) => !prev); // Toggle user visibility
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
        {authUser ? (
          <div>
            {isAdmin ? (
              <div>
                <button
                  onClick={fetchAllUsers}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-4 rounded transition-colors"
                >
                  {showUsers ? "Hide Users" : "Show All Users"}
                </button>
                {showUsers && users.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">All Users:</h2>
                    <ul className="space-y-2">
                      {users.map((user) => (
                        <li
                          key={user.id}
                          className="bg-zinc-800 p-4 rounded shadow"
                        >
                          <p>
                            <span className="font-bold">User ID:</span>{" "}
                            {user.id}
                          </p>
                          <p>
                            <span className="font-bold">Name:</span> {user.name}
                          </p>
                          <p>
                            <span className="font-bold">Surname:</span>{" "}
                            {user.surname}
                          </p>
                          <p>
                            <span className="font-bold">Nickname:</span>{" "}
                            {user.nickname}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-lg">You do not have admin access.</p>
            )}
          </div>
        ) : (
          <p className="text-lg">Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
