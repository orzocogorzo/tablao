#! /usr/bin/env node

// BUILT-INS
const fs = require("fs");

// VARIABLES
const params = process.argv.filter((p, i) => i > 1);

if (params.length) {
    const action = params[0];
    switch (action) {
      case "serve":
        process.env.NODE_ENV = params[1] || "dev";
        require("../tasks.js").serve();
        break;
    case "build":
        process.env.NODE_ENV = params[1] || "pro";
        require("../tasks.js").buld();
        break;
    case "init":
        const dir = params[1] || ".";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        process.chdir(dir);
        require("../tasks.js").init();
        break;
    }
} else {
    console.warn("You must declare, at least, one param from [init, serve, build]");
}
