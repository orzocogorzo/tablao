const BaseView = require("../core/BaseView.js");


const Home = (function () {
    const Home = BaseView.extend(function (el, template) {
        const self = this;
        this.render();
    });

    Home.prototype.onUpdate = function onUpdate () {
        // TO OVERWRITE
    }

    Home.prototype.onRender = function onRender () {
        // TO OVERWRITE
    }

    Home.prototype.onRemove = function onRemove () {
        // TO OVERWRITE
    }

    return Home;
})();

module.exports = Home;