# Tablao
Tablao is a lightweight web development workshop, built on top of gulp, browserify and stylus, extendible with boilerplates. Its purpose is to be a solid ground, a stage where your craft skills go shine without need to worry about nothing more than your development process.

Designed to support simple web apps development, it handler your compilation and development server dependencies with simplicity and lightweight as design principles.

## Installation
You will need node.js and npm installed on your system. We recommend you install it globally.

#### NPM way
`npm install [-g] tablao`

#### Manual way
```
git clone git@github.com:orzocogorzo/tablao.git
cd tablao
npm install [-g]
```

## Command line API
Tablao is designed to be preferent used from the command line. The CLI has three commands:

#### init
With this command **tablao** will load one of its boilerplates in the target directory.

`tablao init [-b <boilerplate>] [<dirname>]`

The optional parameters are:
1. **-b boilerplate** where *boilerplate* musth match one of the **tablao** boilerplates.If it's unset, tablao will load the default vanillajs boilerplate.
2. **dirname** declaring the target directory. If it's unset, **tablao** works with the current directory as target directory.

#### serve
With this command **tablao** will start a development server on the port defined in the *tablaorc.js* file.

`tablao serve`

#### build
With this command **tablao** will compile the application.

`tablao build <environ>`

The param *environ* define which environ configuration files will use **tablao** in the build task and it should match with one of the keys existing in the *envs.js* file. 

## Configuration
For configuration purposes, **tablao** will place in your directory three type of files:

#### tablaorc.js
This file gather all requested information of the project. Formatted as a javascript object, it should contains the following fields:

```javascript
module.exports = {
  dist: "distfolder", // Destination folder where the compilation process has to place its output.
  src: "srcfolder", // Source folder from where the compilation process has to find its inputs.
  public: "publicfolder", // Source folder from where the compilation process has to find the \
  // public files, like media, data or fonts, required by the client.
  port: 8050, // The port where the server will be faced.
  middleware: function (connect, opt) {
    return [
        function (req, res, next) {
            res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.setHeader("Pragme", "no-cache");
            res.setHeader("Expires", "-1");
            next();
        }
    ];
  } // An optional middleware to proxy the communication with the server.
}
```

#### envs.js
The *envs.js* file contains information, to be reacheble from the client, about the environments where the application will be setted up with. It has the following format:

```javascript
module.exports = {
  dev: {
    name: "development",
    host: "127.0.0.1",
    port: 8050,
    apiURL: "/public/data/",
    publicURL: "/public/"
  },
  pre: {
    name: "preproduction",
    host: "http://pre.domain.com/path/",
    port: null,
    apiURL: "http://pre.domain.com/api/",
    publicURL: "http://pre.domain.com/public/"
  },
  pro: {
    name: "production",
    host: "https://domain.com/path/",
    port: null,
    apiURL: "https://domain.com/api/",
    publicURL: "https://domain.com/public/"
  }
}
```

Each entry of the object, identifyed by a key, must gather the information about one environment. **The development environment must be identifyed by the key `dev` and it should be always present on the object** because its the key that **tablao** is going to search when it start the development server. This keys must match with the *globals* file names to allow **tablao** to know what global variables should it use on the compilation process. At least, this object will be placed, on the client, on the global scope varibale `_env` allowing the client to realise how to reach the server.

#### globals
Inside the folder *globals* it must be, at least, one `global.<env>.js` file with global variables that can be reached from arround on the compilation process. Like the envs.js file, **it's important to get, at least, the `global.dev.js` file**. Formatted as a javascript object, it should fits the following format:

```javascript
module.exports = {
  KEY1: "value",
  KEY2: 00
}
```

This variables will be accessible from the js, html and stylus files on the compilation task. On js their'll be publics throw the `process.env` object. From the html files you have to follow the syntax `{{KEY}}` to access the values. At last, from stylus files, you can get the values writting the KEY name there where you want to place the value.
