"use strict";

const spawn = require("child_process").spawn;
const spawnOptions = { stdio: "inherit" };
const suffix = (process.platform === "win32") ? ".cmd" : "";

const watchMode = process.argv[2] === "-w";
const bundler = watchMode ? "watchify" : "browserify";
const watchArgs = watchMode ? [ "-w" ] : [];

try { fs.mkdirSync(`${__dirname}/lib`); } catch (err) {}

spawn(`pug${suffix}`, watchArgs.concat([ `${__dirname}/src/index.pug`, "--out", `${__dirname}/lib` ]), spawnOptions);
spawn(`stylus${suffix}`, watchArgs.concat([ `${__dirname}/src/index.styl`, "--out", `${__dirname}/lib` ]), spawnOptions);

spawn(`tsc${suffix}`, [ "-p", `${__dirname}/src` ], spawnOptions).on("close", () => {
  if (watchMode) spawn(`tsc${suffix}`, watchArgs.concat([ "-p", `${__dirname}/src` ]), spawnOptions);
  spawn(`${bundler}${suffix}`, [ `${__dirname}/src/index.js`, "-s", "SimpleDialogs", "-p", "browserify-derequire", "-o", `${__dirname}/lib/SimpleDialogs.js` ], spawnOptions);
});
