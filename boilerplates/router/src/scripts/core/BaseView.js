const Mustache = require("mustache");

const BaseView = (function () {

    /// PRIVATE BLOCK CODE
    var privata_data = new Object();
    /// END OF PRIVATE BLOCK CODE

    const BaseView = function BaseView (el, template) {
        const self = this;
        this.el = el;
        this.template = template;
        Object.defineProperty(this, "data", {
            get: function () {
                return privata_data;
            },
            set: function (data) {
                privata_data = data;
                self.dispatch("update");
            }
        });
        this.eventBounds = new Map();
        this.on("render", this.onRender, this);
        this.on("remove", this.onRemove, this);
        this.on("update", this.onUpdate, this);
    }

    BaseView.prototype.render = function render () {
        const renderer = document.createElement("template");
        renderer.innerHTML = Mustache.render(this.template, this.data);
        this.el.innerHTML = "";
        this.el.appendChild(renderer.content);
        this.dispatch("render");
    }

    BaseView.prototype.remove = function remove () {
        for (let entry of this.eventBounds.entries()) {
            this.el.removeEventListener(...entry)
        }
        this.dispatch("remove");
    }

    BaseView.prototype.onRender = function onRender () {
        // TO OVERWRITE
        console.log("onRender");
    }

    BaseView.prototype.onRemove = function onRemove () {
        // TO OVERWRITE
        console.log("onRemove");
    }

    BaseView.prototype.onUpdate = function onUpdate () {
        // TO OVERWRITE
        console.log("onUpdate");
    }

    BaseView.prototype.on = function on (event, callback, context=null) {
        this.eventBounds.set(event, function (ev) {
            callback.call(context, event, ev.details, ev);
        });
        this.el.addEventListener(event, this.eventBounds.get(event));
    }

    BaseView.prototype.off = function off (event) {
        this.el.removeEventListener(event, this.eventBounds.get(event));
    }

    BaseView.prototype.dispatch = function dispatch (event, data) {
        this.el.dispatchEvent(new CustomEvent(event, {
            detail: data
        }));
    }

    BaseView.prototype.load = function load (path) {
        const self = this;
        return new Promise(function (res, rej) {
            const ajax = new XMLHttpRequest();
            ajax.open("GET", window._env.publicURL + path);
            ajax.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        res(this.response);
                    } else {
                        rej(this.status);
                    }
                }
            }
            ajax.send();
        });
    }

    BaseView.extend = function extend (Class) {
        const Wrapper = function (el, template) {
            BaseView.call(this, el, template);
            Class.call(this, el, template);
        }

        Class.prototype = Object.create(BaseView.prototype);
        Wrapper.prototype = Class.prototype;
        Wrapper.extend = BaseView.prototype.extend;
        return Wrapper
    }

    return BaseView;
})();

module.exports = BaseView;