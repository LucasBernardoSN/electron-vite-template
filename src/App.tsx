import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const appPlatform = import.meta.env.VITE_APP_PLATFORM;

  useEffect(() => {
    console.log("🔰 => appPlatform:", appPlatform);

    if (appPlatform === "desktop") {
      import("electron")
        .then((electron) => {
          electron.ipcRenderer.on("main-process-message", (_event, ...args) => {
            console.log("[Receive Main-process message]:", ...args);
          });
        })
        .catch(() => {
          console.error(
            "Error on import electron, probably not running on electron"
          );
        });
    }

    return () => {
      if (appPlatform === "desktop") {
        import("electron")
          .then((electron) => {
            electron.ipcRenderer.off("main-process-message", () => {});
          })
          .catch(() => {
            console.error(
              "Error on import electron, probably not running on electron"
            );
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
        Place static files into the<code>/public</code> folder.
      </div>
      <p>Platform: {appPlatform ?? "Error: No platform detected"}</p>
    </div>
  );
}

export default App;
