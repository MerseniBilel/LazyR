const vscode = require("vscode");
const fs = require("fs");

module.exports = class {
  projectType = "js";
  projectDirectory = vscode.workspace.workspaceFolders[0].uri.fsPath + "\\";
  constructor() {
    try {
      if (fs.existsSync(this.projectDirectory + "tsconfig.json")) {
        this.projectType = "ts";
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteUnecessaryFiles() {
    const filesToDelete = [
      "src\\App.css",
      "src\\App.test." + (this.projectType == "ts" ? "tsx" : "js"),
      "src\\logo.svg",
      "src\\reportWebVitals." + this.projectType,
      "src\\setupTests." + this.projectType,
      "public\\favicon.ico",
      "public\\manifest.json",
      "public\\robots.txt",
      "public\\logo192.png",
      "public\\logo512.png",
    ];
    filesToDelete.map((ff) => {
      if (fs.existsSync(this.projectDirectory + ff)) {
        fs.unlinkSync(this.projectDirectory + ff);
      }
    });
  }

  cleanIndexFile() {
    const filename =
      this.projectDirectory +
      "src\\index." +
      (this.projectType == "ts" ? "tsx" : "js");

    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename, "utf-8").split("\n");
      const dataToWrite = data.filter(function (line) {
        return !line.includes("reportWebVitals") && !line.includes("//");
      });
      if (dataToWrite.length != data.length) {
        fs.writeFileSync(filename, dataToWrite.join("\n"), "utf-8");
      }
    }
  }

  cleanAppFile() {
    const filename =
      this.projectDirectory +
      "src\\App." +
      (this.projectType == "ts" ? "tsx" : "js");

    const dataToWrite = `
const App = () => {
  return (
    <div>
      
    </div>
  )
}
export default App`;

    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename, "utf-8").split("\n");
      if (dataToWrite.split("\n").length != data.length) {
        fs.writeFileSync(filename, dataToWrite, "utf-8");
      }
    }
  }
};
