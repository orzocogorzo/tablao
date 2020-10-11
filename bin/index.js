#! /usr/bin/env node

// BUILT-INS
const fs = require("fs");

// VARIABLES
const params = process.argv.filter((p, i) => i > 1).reduce((acum, param, i, params) => {
    if (i == 0) {
        acum["action"] = param;
    } else if (param.indexOf("-b") === 0) {
        acum["boilerplate"] = null; 
    } else {
        if (acum["boilerplate"] === null) {
            acum["boilerplate"] = param;
        } else {
            acum["target"] = param;
        }
    }
    return acum;
}, new Object());

if (Object.keys(params).length) {
    switch (params.action) {
      case "serve":
        process.env.NODE_ENV = "dev";
        require("../tasks.js").serve();
        break;
    case "build":
        process.env.NODE_ENV = params.target || "pro";
        require("../tasks.js").build();
        break;
    case "init":
        if (!fs.existsSync(params.target)) {
            fs.mkdirSync(params.target);
        }
        process.chdir(params.target);
        process.env.BOILERPLATE = params.boilerplate || "default";
        require("../tasks.js").init();
        break;
    default:
        console.error("[ERROR]: Unrecognized command.");
        break;
    }
} else {
    console.warn("You must declare, at least, one param from [init, serve, build]");
}
