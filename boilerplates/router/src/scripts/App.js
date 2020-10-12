const Router = require("./router/Router.js");

module.exports = function startApp () {
    // document.getElementById("app").innerHTML = `<h1 style="text-align: center; font-size: 2.5rem; margin-top: 50px;">Hello World from Tablao App!</h1>`;
    new Router().on(function () {
        window.location.hash = "home";
    }).resolve();
}
