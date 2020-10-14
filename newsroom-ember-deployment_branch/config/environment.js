'use strict';

module.exports = function(environment) {
    let ENV = {
        modulePrefix: 'ember-drupal',
        environment: environment,
        rootURL: '/NewsTest/frontend/',
        hostURL: 'http://mvenki.com/Newsdrupal/web/',
        locationType: 'auto',
        contentSecurityPolicy: {
            'style-src': "'self' 'unsafe-inline'",
            'script-src': "'self' 'unsafe-eval' http://140.215.104.210",
            'connect-src': "'self' http://140.215.104.210"
        },
        pageTitle: {
            replace: true
        },
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }
    };


    switch (environment) {
        case "dev":
            console.log("dev environment")
            ENV.host = 'http://140.215.104.210/NewsTest/drupal/index.php/api/content'
            break;
        case "test":
            console.log("test environment")
            ENV.host = 'http://140.215.104.210/NewsTest/drupal/index.php/api/content'
            console.log("This is only for running tests, but you probably knew that... ")
            break;
        case "local":
            console.log("local environment")
            ENV.host = 'http://140.215.104.210/NewsTest/drupal/index.php/api/content'
            break;
        default:
            console.log("no environment assigned")

    }

    return ENV;
};