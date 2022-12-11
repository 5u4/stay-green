import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

function App() {
  const [running, setRunning] = useState(false);

  async function moveCursor(offset: number) {
    await invoke("move_cursor", { offset });
  }

  useEffect(() => {
    if (!running) return;
    let offset = 1;
    const id = setInterval(() => {
      offset *= -1;
      moveCursor(offset);
    }, 1000 * 60);
    return () => clearInterval(id);
  }, [running]);

  const onClickAction = () => {
    setRunning(!running);
  };

  return (
    <div className="grid h-full place-items-center p-2">
      <button
        onClick={onClickAction}
        className="w-full items-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        {running ? "Stop" : "Start"}
      </button>
    </div>
  );
}

export default App;
