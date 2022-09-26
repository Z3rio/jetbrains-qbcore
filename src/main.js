// Import all of the required modules
import fs from "fs";
import fsExtra from "fs-extra";

import fetch from "node-fetch";

// Setup build directory
if (!fs.existsSync("./build")) {
  fs.mkdirSync("./build");
}

if (!fs.existsSync("./build/zerio-intellij")) {
  fs.mkdirSync("./build/zerio-intellij");
}

if (!fs.existsSync("./build/zerio-intellij/QBCore")) {
  fs.mkdirSync("./build/zerio-intellij/QBCore");
} else {
  fsExtra.emptyDirSync("./build/zerio-intellij/QBCore");
}

// Get JSON data
let response = await fetch(
  "https://raw.githubusercontent.com/Z3rio/jetbrains-qbcore/main/data/qbcore.json",
  { cache: "no-store", method: "GET" }
).catch(function (err) {
  console.log("Failed to fetch data");
  console.log(err);
});

let data = JSON.parse(await response.text());

// Create auto-completion data files
for (let i = 0; i < data.length; i++) {
  let currentSection = data[i];
  let string = currentSection.imports + "\n";

  for (let i2 = 0; i2 < currentSection.list.length; i2++) {
    const currentFunction = currentSection.list[i2];

    // Create usage string
    var usage = currentSection.prefix + currentFunction.name;
    var func = "function " + currentSection.prefix + currentFunction.name;
    if (currentFunction.args == undefined || currentFunction.args.length == 0) {
      usage += "()";
      func += "() end";
    } else {
      usage = `${currentFunction.returns} ${usage}(`;
      func += "(";
    }

    // Create actual function instruction string
    string += `${
      currentFunction.description !== undefined
        ? "--@description " + currentFunction.description + "\n"
        : ""
    }--@module QBFUNCTION\n--@submodule ${currentSection.name}\n--@see ${
      currentSection.prefix
    }${currentFunction.name}\n--@usage ${usage}\n--@return ${
      currentFunction.returns
    }\n${func}\n\n`;
  }

  // Create auto-completion instruction file
  fs.appendFile(
    `./build/zerio-intellij/QBCore/${currentSection.name}.lua`,
    string,
    function (err) {
      if (err) throw err;
      console.log(`Saved ${currentSection.name}.lua`);
    }
  );
}
