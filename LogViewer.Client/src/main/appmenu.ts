import { app, Menu, shell } from "electron";
import * as file from "./file";
import * as webapi from "./webapi";

const template: Electron.MenuItemConstructorOptions[] = [
{
  label: "File",
  submenu: [
      {
          id: "logviewer.open",
          label: "Open Log",
          accelerator: "CmdOrCtrl+O",
          click: (menuItem, focusedWindow) => {
            file.openFileDialog(focusedWindow.webContents);
        },
      },
      {
        id: "logviewer.close",
        label: "Close Log",
        enabled: false,
        click: (menuItem, focusedWindow) => {

            // Disable the close menu item & re-activate the open menu item
            updateMenuEnabledState("logviewer.open", true);
            updateMenuEnabledState("logviewer.close", false);
            updateMenuEnabledState("logviewer.reload", false);
            updateMenuEnabledState("logviewer.export", false);

            // Resets the UI later to open a new nucache file
            // By sending a signal/event that we listen for
            focusedWindow.webContents.send("logviewer.file-closed");
        },
    },
    {
        id: "logviewer.reload",
        label: "Reload Log",
        enabled: false,
        accelerator: "CmdOrCtrl+R",
        click: (menuItuem, focusedWindow) => {
            webapi.reload(focusedWindow.webContents);
        },
    },
    {
        id: "logviewer.export",
        label: "Export to file",
        enabled: false,
        accelerator: "CmdOrCtrl+S",
        click: (menuItem, focusedWindow) => {
            file.saveDialog(focusedWindow.webContents);
        },
    },
    { role: "close" }
  ],
},
{
    label: "Edit",
    submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "delete" },
        { role: "selectAll" },
    ],
},
{
    label: "View",
    submenu: [
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
    ],
},
{
    role: "window",
    submenu: [
        { role: "minimize" },
        { role: "close" },
    ],
}];

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideOthers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" },
    ],
  });

  // Window menu
  template[3].submenu = [
    { role: "close" },
    { role: "minimize" },
    { role: "zoom" },
    { type: "separator" },
    { role: "front" },
  ];
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

export function updateMenuEnabledState(menuId: string, enabledState: boolean):void {
    const menuToUpdate = menu.getMenuItemById(menuId);

    if (menuToUpdate) {
        menuToUpdate.enabled = enabledState;
    }
}
