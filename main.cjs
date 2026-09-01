const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;
let handWindow = null;

function applyWindowZoom(win, action) {
  if (!win || win.isDestroyed()) return;
  const contents = win.webContents;
  const current = contents.getZoomFactor();
  if (action === 'in') {
    contents.setZoomFactor(Math.min(3, current + 0.1));
    return;
  }
  if (action === 'out') {
    contents.setZoomFactor(Math.max(0.5, current - 0.1));
    return;
  }
  contents.setZoomFactor(1);
}

function wireZoomShortcuts(win) {
  if (!win || win.isDestroyed()) return;
  win.webContents.on('before-input-event', (event, input) => {
    if (!input || !input.control || input.type !== 'keyDown') return;
    const key = String(input.key || '').toLowerCase();
    if (key === '+' || key === '=' || key === 'add') {
      event.preventDefault();
      applyWindowZoom(win, 'in');
      return;
    }
    if (key === '-' || key === '_' || key === 'subtract') {
      event.preventDefault();
      applyWindowZoom(win, 'out');
      return;
    }
    if (key === '0') {
      event.preventDefault();
      applyWindowZoom(win, 'reset');
    }
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1480,
    height: 980,
    minWidth: 1100,
    minHeight: 760,
    backgroundColor: '#080b13',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'frigate.html'));
  wireZoomShortcuts(mainWindow);
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (handWindow && !handWindow.isDestroyed()) {
      handWindow.close();
    }
  });
}

function openHandWindow() {
  if (handWindow && !handWindow.isDestroyed()) {
    handWindow.focus();
    return handWindow;
  }

  handWindow = new BrowserWindow({
    width: 1500,
    height: 700,
    minWidth: 900,
    minHeight: 420,
    transparent: true,
    frame: false,
    hasShadow: false,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  handWindow.loadFile(path.join(__dirname, 'hand-popout.html'));
  wireZoomShortcuts(handWindow);

  handWindow.on('closed', () => {
    handWindow = null;
  });

  return handWindow;
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('frigate:open-hand-window', () => {
  openHandWindow();
});

ipcMain.handle('frigate:close-current-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.close();
  }
});

ipcMain.handle('frigate:zoom-current-window', (event, action) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  applyWindowZoom(win, action);
});
