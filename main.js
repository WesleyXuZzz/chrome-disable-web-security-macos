//Uses node.js process manager
const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const child_process = require("child_process");

// This function will output the lines from the script
// and will return the full combined output
// as well as exit code when it's done (using the callback).
var mainWindow;
function run_script(command, args, callback) {
  var child = child_process.spawn(command, args, {
    encoding: "utf8",
    shell: true,
  });
  // You can also use a variable to save the output for when the script closes later
  child.on("error", (error) => {
    dialog.showMessageBox({
      title: "Title",
      type: "error",
      message: "Error occured.\r\n" + error,
    });
  });

  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (data) => {
    //Here is the output
    data = data.toString();
    console.log(data);
    dialog.showMessageBox({
      title: "Title",
      type: "info",
      message: "stdout occured.\r\n" + data,
    });
  });

  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (data) => {
    // Return some data to the renderer process with the mainprocess-response ID
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    mainWindow.webContents.send("mainprocess-response", data);
    //Here is the output from the command
    console.log(data);
    dialog.showMessageBox({
      title: "Title",
      type: "error",
      message: "stderr occured.\r\n" + data.toString(),
    });
  });

  child.on("close", (code) => {
    //Here you can get the exit code of the script
    switch (code) {
      case 0:
        // dialog.showMessageBox({
        //   title: "Title",
        //   type: "info",
        //   message: "End process.\r\n",
        // });
        app.quit();
        break;
    }
  });
  if (typeof callback === "function") callback();
}

app.whenReady().then(() => {
  run_script(
    "open -a 'Google Chrome.app' --args --disable-web-security --user-data-dir=/Users/ROOT/Documents/MyChromeDevUserData",
    [],
    null
  );
});
