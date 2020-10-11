// TABLAO CONFIGURATION FILE WITH INFORMATION
// ABOUT THE FOLDER STRUCTURE

module.exports = {
    dist: "dist",
    src: "src",
    statics: "statics",
    port: 8050,
    deploy: "/home/orzo/Desktop/package",
    middleware: function (connect, opt) {
        // Example middleware to disable cache on local environment.
        return [function (req, res, next) {
            res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.setHeader("Pragme", "no-cache");
            res.setHeader("Expires", "-1");
            next();
        }];
    }
}
