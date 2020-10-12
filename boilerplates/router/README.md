# Router Tablao App

#### Repository structure
    `./`
    |- `globals/` <-- Folder with global variables declared for each required compilation environment.
    |- `dist/` <-- Folder where our app will be placed after a development compilation.
    |- `public/` <-- Folder to save documents, data an any kind of worthy files related to the project and required by the client.
        |- ' data/` <-- Folder where our data (json, csv, xml...) files will be placed.
        |- `templates/` <-- Folder where our templates will be placed.
        |- `images/` <-- Folder where our images will be placed.
        |- `fonts/` <-- Folder where our fonts will be placed.
    |- `src/` <-- Folder where all our app source will be placed
        |- `scripts/` <-- Folder where our js scripts will be placed.
            |- `components/`
            |- `core/`
            |- `router/`
            |- `views/`
            |- `app.js`
        |- `styles/` <-- Folder where our stylus scripts will be placed.
            |- `components/`
            |- `reset/`
            |- `views/`
            |- `app.styl`
        |- `index.html` <-- index.html is our index html file.
        |- `index.js` <-- index.js is our index file for our js scripts.
        |- `index.css` <-- index.css is our index file for our stylus stylesheets.
    |- `tablaorc.js` <-- Config file for the tablao CLI.
    |- `envs.js` <-- Config file where our client environment variables may be defined.
    |- `README.md` <-- Description of the boilerplate

#### API