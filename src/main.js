var fs = require("fs");

fs.appendFile("./build/test.lua", 'print("yes")', function (err) {
  if (err) throw err;
  console.log("Saved!");
});
