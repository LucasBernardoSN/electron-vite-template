import nodeLogo from "./assets/node.svg";
import { useEffect, useState } from "react";
import "./App.scss";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

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
    <div className="App">
      <div>
        <a
          href="https://github.com/electron-vite/electron-vite-react"
          target="_blank"
        >
          <img
            src="./electron-vite.svg"
            className="logo"
            alt="Electron + Vite logo"
          />
        </a>
      </div>
      <h1>Electron + Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Electron + Vite logo to learn more
      </p>
      <div className="flex-center">
        Place static files into the<code>/public</code> folder{" "}
        <img style={{ width: "5em" }} src={nodeLogo} alt="Node logo" />
      </div>
    </div>
  );
}

export default App;
