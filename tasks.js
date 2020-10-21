// SYS
const path = require("path");
const fs = require("fs");

// VENDOR
const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const browserify = require('browserify');
const envify = require("envify/custom");

// GULP PLUGINS
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const stylus = require('gulp-stylus');
const image = require('gulp-image');
const vinylSource = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const replace = require('gulp-token-replace');
const connect = require('gulp-connect');
const rename = require('gulp-rename');

const cwd = process.cwd();
const distDir = path.join(cwd, ".dist");
const rc = (function () {
  const template = {
    src: "src",
    public: "public"
  };
  try {
    var user;
    try {
        user = require(path.join(cwd, "tablaorc.js"));
    } catch (err) {
        user = new Object();
    }
    Object.keys(template).map((k) => {
      user[k] = user[k] || template[k];
    });
    return user;
  } catch (e) {
      console.error("[ERROR]: ", e);
    console.warn("[WARN]: Not tablaorc.js file found. Tablao will use the default config.");
    return template;
  }
})();

function globals () {
  let globals;
  try {
    globals = require(path.join(cwd, `globals/global.${process.env.NODE_ENV}.js`));

    for (let k in globals) {
      globals[k.toUpperCase()] = globals[k];
      delete globals[k.toLowerCase()];
      process.env[k.toUpperCase()] = process.env[k.toUpperCase()] || globals[k.toUpperCase()];
    }
  } catch (err) {
    throw new Error("[ERROR]: No build folder found. Please define your build environment config files into a build folder on your root directory.");
  }

  try {
    globals.ENVIRON = require(path.join(cwd, "envs.js"))[process.env.NODE_ENV];
    return globals;
  } catch (err) {
    throw new Error("[ERROR]: Not envs.js found. Please define your client environment variables in a file and name it envs.js on your root directory.");
  }
}
globals.description = "Retrive object from global files.";

function init (done) {
    if (!fs.existsSync(path.join(__dirname, `boilerplates/${process.env.BOILERPLATE}`))) {
        console.warn("[WARN]: Boilerplate not found. Tablao will continue with the default vanilla.js boilerplate.");
        process.env.BOILERPLATE = "vanilla";
    }
    return src(path.join(__dirname, `boilerplates/${process.env.BOILERPLATE}/**/*`), {read: true})
        .pipe(dest(cwd));
}
init.description = "Create the boilerplate directory.";
exports.init = init;

function clean (done) {
  return del([
    path.join(distDir + "\*")
  ], {
    force: true
  });
}
clean.description = "Remove dist folder contents";

function dist (done) {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }
  const public = path.join(distDir, "public");
  return src("*.*", {read: false})
    .pipe(dest(public));
};
dist.description = "Create dist directory structure";

function deploy (done) {
  return src(path.join(distDir, "\*"))
    .pipe(dest(path.join(rc.dist)));
}
deploy.description = 'Deploy bundling to the server';

function js (done) {
  const b = browserify({
      entries: path.join(rc.src, "index.js"),
      debug: process.env.NODE_ENV === "dev"
  });

  b.transform(envify(globals()));

  var proc = b.bundle()
    .pipe(vinylSource('bundle.js'))
    .pipe(vinylBuffer());

  if (process.env.NODE_ENV === 'PRO') {
    proc = proc.pipe(sourcemaps.init({loadMaps: true}))
      .pipe(babel({presets: ['@babel/preset-env']}))
      .pipe(uglify())
      .on('error', console.error)
    .pipe(sourcemaps.write());
  } else {
    proc = proc.pipe(connect.reload());
  }

  return proc.pipe(dest(distDir));
}
js.description = 'Bundle js files, compile them with buble and uglify and move the output to the dist folder';

function css (done) {
  return src(path.join(rc.src, "index.styl"))
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(stylus({
        compress: true,
        'include css': true,
        rawDefine: globals()
      }))
    .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(connect.reload())
    .pipe(dest(distDir));
}
css.descriptions = "Bundle all styuls files, compile them and move the output to the dist folder";

function public (done) {
  return src(path.join(rc.public, "\*\*/\*"))
    .pipe(image())
    .pipe(connect.reload())
    .pipe(dest(path.join(distDir, rc.public)));
}
public.description = "Move public to dist folder";

function html (done) {
  return src(path.join(rc.src, "index.html"))
    .pipe(replace({global: globals()}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(connect.reload())
    .pipe(dest(distDir));
}
html.description = "Minify index.html and put it on the dist folder";

const bundle = parallel(html, js, css, public);

const pipeline = series(clean, dist, bundle);

const serve = series(pipeline, function serve (done) {
  connect.server({
    livereload: true,
    port: rc.port,
    root: distDir,
    debug: true,
    name: "tablao",
    middleware: rc.middleware
  });

  watch(path.join(rc.src, "index.html"), series(html));
  watch(path.join(rc.src, "\*\*/\*.js"), series(js));
  watch(path.join(rc.src, "\*\*/\*.styl|css"), series(css));
  watch(path.join(rc.public, "\*\*/\*"), series(public));
});
serve.description = "Setup a static server, start a livereload listener and put gulp watching for changes";
exports.serve = serve;

const build = series(pipeline, deploy, function (done) {
    return done();
});
build.description = "Execute build rutine and deploy the result on the server";
exports.build = build;


function defaultTask () {
  serve();
}

exports.default = defaultTask;
