// OBJECT WITH GLOBAL VISIBILITY ON THE CLIENT WITH
// INFORMATION ABOUT HOW TO REACH THE SERVER

module.exports = {
    dev: {
        name: 'development',
        host: '127.0.0.1',
        port: 8050,
        apiURL: '/statics/data/',
        staticsURL: '/statics/'
    },
    pre: {
        name: 'preproduction',
        host: 'http://pre.domain.com/path',
        port: null,
        apiURL: 'http://pre.domain.com/path/rest/',
        staticsURL: 'http://pre.domain.com/path/statics/'
    },
    pro: {
        name: 'production',
        host: "http://domain.com/path",
        port: null,
        apiURL: 'http://domain.com/path/rest/',
        staticsURL: 'http://domain.com/path/app/statics/'
    }
}
