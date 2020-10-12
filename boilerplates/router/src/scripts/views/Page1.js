const BaseView = require("../core/BaseView.js");


const Page1 = (function () {
    const Page1 = BaseView.extend(function (el, template) {
        const self = this;
        this.render();
    });

    Page1.prototype.onUpdate = function onUpdate () {
        // TO OVERWRITE
        console.log("Page1 updated");
    }

    Page1.prototype.onRender = function onRender () {
        // TO OVERWRITE
        console.log("Page1 rendered");
    }

    Page1.prototype.onRemove = function onRemove () {
        // TO OVERWRITE
        console.log("Page1 removed");
    }

    return Page1;
})();

module.exports = Page1;