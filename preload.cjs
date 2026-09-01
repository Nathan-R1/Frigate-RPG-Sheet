const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('frigateElectron', {
  openHandWindow: () => ipcRenderer.invoke('frigate:open-hand-window'),
  closeCurrentWindow: () => ipcRenderer.invoke('frigate:close-current-window'),
  zoomInCurrentWindow: () => ipcRenderer.invoke('frigate:zoom-current-window', 'in'),
  zoomOutCurrentWindow: () => ipcRenderer.invoke('frigate:zoom-current-window', 'out'),
  resetCurrentWindowZoom: () => ipcRenderer.invoke('frigate:zoom-current-window', 'reset')
});
