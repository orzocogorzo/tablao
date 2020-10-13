# Vanilla Tablao App

An empty, not imperative, boilerplate with no dependencies more than vanilla.js.

#### Repository structure
```
root
|   tablaorc.js         ## Configuration file for the tablao CLI.
|   envs.js             ## Configuration file where our client environment variables may be defined.
|   README.md           ## Description of the boilerplate.
└───globals             ## Folder with global variables declared for each required compilation environment.
|   global.dev.js       ## Development global variables.
└───public              ## Folder to save documents, data an any kind of worthy files related to the project and required by the client.
|   └───data            ## Folder where our static data (json, csv, xml...) files will be placed.
|   └───images          ## Folder where our images will be placed.
|   └───fonts           ## Folder where our fonts will be placed.
└───src                 ## Folder where all our app source will be placed.
    |   index.html      ## index.html is our index file.
    |   index.js        ## index.js is our index file for our JS scripts.
    |   index.css       ## index.css is our index file for our Stylus stylesheets.
    └───scripts         ## Folder where our js scripts will be placed.
    |   |   app.js      ## JS application root module.
    └───styles          ## Folder where our stylus scripts will be placed.
        |   app.styl    ## Stylesheet for the application module.
        └───reset       ## Stylesheets with basic style rules and variables.
```

#### API
This boilerplate isn't imperative and allow to define your own framework and structure rules.