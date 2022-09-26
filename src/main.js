const fs = require("fs");
const fsExtra = require("fs-extra");

const request = require("request");

// Setup build directory
if (!fs.existsSync("./build")) {
  fs.mkdirSync("./build");
} else {
  fsExtra.emptyDirSync("./build");
}

if (!fs.existsSync("./build/zerio-intellij")) {
  fs.mkdirSync("./build/zerio-intellij");
}

if (!fs.existsSync("./build/zerio-intellij/QBCore")) {
  fs.mkdirSync("./build/zerio-intellij/QBCore");
}

// Get JSON data
let data = [];
request.get(
  "https://raw.githubusercontent.com/Z3rio/jetbrains-qbcore/main/data/qbcore.json",
  (error, request, content) => {
    data = JSON.parse(content);

    // Create auto-completion data files
    for (i = 0; i < data.length; i++) {
      let currentSection = data[i];
      let string = "";

      for (const currentFunction in currentSection.list) {
        console.log(currentFunction);
        console.log(currentFunction.description);
        string += `
            ${
              currentFunction.description !== undefined
                ? "--@description " + currentFunction.description + "\n"
                : ""
            }
        `;
      }

      fs.appendFile(
        `./build/zerio-intellij/QBCore/${currentSection.name}.lua`,
        string,
        function (err) {
          if (err) throw err;
          console.log(`Saved ${currentSection.name}.lua`);
        }
      );
    }
  }
);
