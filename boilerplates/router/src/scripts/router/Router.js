// VENDOR
const Navigo = require("navigo");

// COMPONENTS
const Header = require("../components/Header.js");
const Footer = require("../components/Footer.js");

// VIEWS
const Home = require("../views/Home.js");
const Quotes = require("../views/Quotes.js");


const Router = (function () {
    // PRIVATE CODE BLOCK
    function beforeNavigate (cssEl) {
        const el = document.querySelector(cssEl);
        if (el && this.views.get(el)) {
            this.views.get(el).remove();
        }
    }
    const cache = new Map();
    // END OF PRIVATE CODE BLOCK
    
    const Router = function Router () {
        const self = this;
        this.views = new Map();
        this.navigo = new Navigo(null, true, "#");
    
        this.navigo.on("home", self.onNavigate("home.html", "#content", Home))
            .resolve();

        this.navigo.on("quotes", self.onNavigate("quotes.html", "#content", Quotes))
            .resolve();

        self.ajax("templates/header.html").then(function (template) {
            const el = document.querySelector("header");
            const view = new Header(el, template);
            self.views.set(el, view);
        });
        
        self.ajax("templates/footer.html").then(function (template) {
            const el = document.querySelector("footer");
            const view = new Footer(el, template);
            self.views.set(el, view);
        });
    }

    Router.prototype.onNavigate = function onNavigate (templateName, cssEl, View) {
        const self = this;
        return function () {
            if (cache.get(templateName)) {
                beforeNavigate.call(self, cssEl);
                const el = document.querySelector(cssEl);
                const view = new View(el, cache.get(templateName));
                self.views.set(el, view);
            } else {
                self.ajax("templates/" + templateName)
                .then(function (template) {
                    cache.set(templateName, template);
                    beforeNavigate.call(self, cssEl);
                    const el = document.querySelector(cssEl);
                    const view = new View(el, template);
                    self.views.set(el, view);    
                });   
            }
        }
    }

    Router.prototype.ajax = function ajax (path) {
        return new Promise(function (res, rej) {
            var ajax = new XMLHttpRequest();
            ajax.open("GET", window._env.publicURL + path, true);
            ajax.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        res(this.response);
                    } else {
                        rej(this);
                    }
                }
            }
            ajax.send();
        });
    }

    Router.prototype.on = function on () {
        return this.navigo.on.apply(this.navigo, arguments);
    }

    return Router;
})();

module.exports = Router;