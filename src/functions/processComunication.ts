import { ipcRenderer } from "electron";

export function sendMessageToMainProcess(channel: string, message: string) {
  ipcRenderer.send(channel, message);
}

export function receiveMessageFromMainProcess(
  channel: string,
  callback: (event: any, message: string) => void
) {
  ipcRenderer.on(channel, callback);
}
