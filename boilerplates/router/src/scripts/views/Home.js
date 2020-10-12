const BaseView = require("../core/BaseView.js");


const Home = (function () {
    const Home = BaseView.extend(function (el, template) {
        const self = this;
        this.render();
    });

    Home.prototype.onUpdate = function onUpdate () {
        // TO OVERWRITE
        console.log("Home updated");
    }

    Home.prototype.onRender = function onRender () {
        // TO OVERWRITE
        console.log("Home rendered");
    }

    Home.prototype.onRemove = function onRemove () {
        // TO OVERWRITE
        console.log("Home removed");
    }

    return Home;
})();

module.exports = Home;