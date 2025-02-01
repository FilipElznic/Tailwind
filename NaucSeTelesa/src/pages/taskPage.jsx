import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useGlobalData } from "../Global";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [userXp, setUserXp] = useState(0); // XP pro aktuálního uživatele
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Sledování odpovědí
  const { authUser, userData } = useGlobalData();

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

  const handleAnswerClick = async (taskId, answer) => {
    const task = tasks.find((t) => t.id === taskId);
    const isCorrect = task.correctanswer === answer;

    // Aktualizace vybrané odpovědi pro barvení
    setSelectedAnswers((prev) => ({
      ...prev,
      [taskId]: isCorrect ? "correct" : "wrong",
    }));

    if (isCorrect) {
      // Přidání XP uživateli
      const xpToAdd = task.xp;
      const { error } = await supabase
        .from("user")
        .update({ xp: userXp + xpToAdd })
        .eq("id", userData.id); // Zde použij ID aktuálního uživatele
      if (error) {
        console.error("Error updating XP:", error);
      } else {
        setUserXp(userXp + xpToAdd);
        console.log(`Added ${xpToAdd} XP to user`);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br text-white flex flex-col items-center p-6">
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
              <div className="text-sm text-gray-400 space-y-2">
                {["answera", "answerb", "answerc"].map((option) => (
                  <button
                    key={option}
                    className={`block w-full py-2 px-4 rounded-lg ${
                      selectedAnswers[task.id] === "correct" &&
                      task.correctanswer === task[option]
                        ? "bg-green-500"
                        : selectedAnswers[task.id] === "wrong" &&
                          task.correctanswer !== task[option]
                        ? "bg-red-500"
                        : "bg-gray-700"
                    }`}
                    onClick={() => handleAnswerClick(task.id, task[option])}
                  >
                    {task[option]}
                  </button>
                ))}
              </div>
              <p className="text-yellow-400 mt-4">XP: {task.xp}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default TaskPage;
