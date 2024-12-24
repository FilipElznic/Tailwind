import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://bviuhriolcuvayzbgzum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXVocmlvbGN1dmF5emJnenVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MDgyOTksImV4cCI6MjA0NTA4NDI5OX0.A5c9eHjNu37OaCt9DTCr-aKFHvyG8z1X_dHLpxl7aRc"
);

function TaskPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data);
        console.log("Tasks fetched:", data);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
        Task Page
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-xl font-bold mb-4 text-purple-400">
              {task.name}
            </h2>
            <p className="text-gray-300 mb-2">{task.description}</p>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Option A: {task.answera}</p>
              <p>Option B: {task.answerb}</p>
              <p>Option C: {task.answerc}</p>
              <p className="text-green-400">
                Correct Answer: {task.correctanswer}
              </p>
              <p className="text-yellow-400">XP: {task.xp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
