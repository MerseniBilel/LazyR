const vscode = require("vscode");
const Rcleaner = require("./modules/rcleaner");
// clean architecture ==> app should detect if the project is made with js or ts ==> test the existing of the tsconfig file
// add tailwindcss

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "rclean" is now active!');

  let cleanArchitecture = vscode.commands.registerCommand(
    "rclean.cleanProjectArchitecture",
    function () {
      const reactProject = new Rcleaner();
      try {
        reactProject.deleteUnecessaryFiles();
        reactProject.cleanIndexFile(); 
        reactProject.cleanAppFile();
        vscode.window.showInformationMessage("Cleaner : React App is Ready, HappyCoding 👌👋 !!! ")
      } catch (error) {
        vscode.window.showErrorMessage("Unkown Error!: We will solve it soon 😓😓");
      }

    }
  );

  let addTailwindcss = vscode.commands.registerCommand(
    "rclean.addTailwindcss",
    function () {
      vscode.window.showInformationMessage("Adding TailwindCss");
    }
  );
  context.subscriptions.push(cleanArchitecture, addTailwindcss);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
