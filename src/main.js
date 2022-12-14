// Import all of the required modules
import fs from "fs";
import fsExtra from "fs-extra";

import fetch from "node-fetch";

// Setup build directory
if (!fs.existsSync("./build")) {
  fs.mkdirSync("./build");
} else {
  fsExtra.emptyDirSync("./build");
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
let string = data.imports + "\n";

// Create auto-completion data files
for (let i = 0; i < data.functions.length; i++) {
  let currentSection = data.functions[i];

  for (let i2 = 0; i2 < currentSection.list.length; i2++) {
    const currentFunction = currentSection.list[i2];

    // Create usage string
    let usage = `${
      currentFunction.returns !== undefined ? currentFunction.returns : "VOID"
    } ${currentSection.prefix}${currentFunction.name}`;
    let func = "function " + currentSection.prefix + currentFunction.name;
    let params = "";
    if (currentFunction.args == undefined || currentFunction.args.length == 0) {
      usage += "()";
      func += "() end";
    } else {
      // Generate arguement strings
      let args = "";
      let args2 = "";

      for (let i3 = 0; i3 < currentFunction.args.length; i3++) {
        const arg = currentFunction.args[i3];
        if (i3 !== 0) {
          args += ", ";
          args2 += ", ";
          params += "\n";
        }
        params += `--@params ${arg.name} ${arg.type}`;
        args += arg.name;
        args2 += arg.type + " " + arg.label;
      }

      usage = `${usage}(${args2})`;
      func += "(" + args + ") end";
    }

    // Create actual function instruction string
    string += `${
      currentFunction.description !== undefined
        ? "--@description " + currentFunction.description + "\n"
        : ""
    }--@module QBFUNCTION\n--@submodule ${currentSection.name}\n--@see ${
      currentSection.prefix
    }${currentFunction.name}\n--@usage ${usage}\n${
      params !== "" ? params + "\n" : ""
    }${
      currentFunction.returns !== undefined
        ? "--@return " + currentFunction.returns + "\n"
        : ""
    }${func}\n\n`;
  }
  string += "\n";
}

// Create main file
fs.appendFile("./build/Main.lua", string, function (err) {
  if (err) throw err;
  console.log("Saved Main.lua");
});
