const BaseView = require("../core/BaseView.js");


const Quotes = (function () {
    const Quotes = BaseView.extend(function (el, template) {
        const self = this;
        this.load(_env.apiURL + "mocked.json").then(res => {
            this.data = JSON.parse(res).body;
            this.render();
        });
    });

    Quotes.prototype.onUpdate = function onUpdate () {
        // TO OVERWRITE
    }

    Quotes.prototype.onRender = function onRender () {
        // TO OVERWRITE
    }

    Quotes.prototype.onRemove = function onRemove () {
        // TO OVERWRITE
    }

    return Quotes;
})();

module.exports = Quotes;