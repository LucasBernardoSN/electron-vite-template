import { app } from "electron";
import { autoUpdater } from "electron-updater";

export function update(win: Electron.BrowserWindow) {
  if (app.isPackaged) {
    if (win) {
      autoUpdater.checkForUpdates();

      autoUpdater.on("update-downloaded", (event) => {
        setTimeout(() => {
          autoUpdater.quitAndInstall(false, true);
        }, 5000);
      });
    }
  }
}
