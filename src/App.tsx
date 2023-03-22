import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const appPlatform = import.meta.env.VITE_APP_PLATFORM;

    if (appPlatform === "desktop") {
      import("electron").then((electron) => {
        electron.ipcRenderer.on("main-process-message", (_event, ...args) => {
          console.log("[Receive Main-process message]:", ...args);
        });
      });
    }

    return () => {
      if (appPlatform === "desktop") {
        import("electron").then((electron) => {
          electron.ipcRenderer.off("main-process-message", () => {});
        });
      }
    };
  }, []);

  return (
    <div>
      <h1>Electron + Vite + React</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        Place static files into the<code>/public</code> folder
      </div>
    </div>
  );
}

export default App;
