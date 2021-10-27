const vscode = require("vscode");
const fs = require("fs");
const process = require("process");
module.exports = class {
  projectType = "js";
  projectDirectory = vscode.workspace.workspaceFolders[0].uri.fsPath;
  pathSeparetor = "/";
  constructor() {
    // detect the platfrom and change the path separetor
    if(process.platform == "win32"){
      this.pathSeparetor = "\\"
    }
    
    try {
      if (fs.existsSync(this.projectDirectory + this.pathSeparetor + "tsconfig.json")) {
        this.projectType = "ts";
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteUnecessaryFiles() {
    const filesToDelete = [
      "src" + this.pathSeparetor + "App.css",
      "src"+ this.pathSeparetor + "App.test." + (this.projectType == "ts" ? "tsx" : "js"),
      "src" + this.pathSeparetor + "logo.svg",
      "src" + this.pathSeparetor + "reportWebVitals." + this.projectType,
      "src" + this.pathSeparetor + "setupTests." + this.projectType,
      "public" + this.pathSeparetor + "favicon.ico",
      "public" + this.pathSeparetor + "manifest.json",
      "public" + this.pathSeparetor + "robots.txt",
      "public" + this.pathSeparetor + "logo192.png",
      "public" + this.pathSeparetor + "logo512.png",
    ];
    filesToDelete.map((ff) => {
      if (fs.existsSync(this.projectDirectory + this.pathSeparetor + ff)) {
        fs.unlinkSync(this.projectDirectory + this.pathSeparetor + ff);
      }
    });
  }

  cleanIndexFile() {
    const filename =
      this.projectDirectory + this.pathSeparetor + 
      "src" + this.pathSeparetor + "index." +
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
      this.projectDirectory + this.pathSeparetor +
      "src" + this.pathSeparetor + "App." +
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

  cleanHtmlFile (){
    const filename = this.projectDirectory + this.pathSeparetor + "public" + this.pathSeparetor + "index.html";
    if(fs.existsSync(filename)){
      const data = fs.readFileSync(filename, "utf-8").split("\n");
      const dataToWrite = data.filter(line => !line.includes("PUBLIC_URL"));
      if(dataToWrite.length != data.length){
        fs.writeFileSync(filename, dataToWrite.join("\n"), "utf-8");
      }
    }
  }

  cleanCssFile(){
    const filename = this.projectDirectory + this.pathSeparetor + "src" + this.pathSeparetor + "index.css";
    if(fs.existsSync(filename)){
      fs.writeFileSync(filename, "", "utf-8");
    }
  }
};
